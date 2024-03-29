import {
  createSearchParams,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import { FormEvent } from "react";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import getCocktails, { CocktailsOptions } from "../../../api/getCocktails";
import AlcoholicOrNonFilter from "./AlcoholicOrNonFilter";
import Pagination from "../../organisms/Pagination";

const FormWrapper = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: end;
  gap: 1em;
  flex-wrap: wrap;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-auto-rows: max-content;
`;

const CocktailsSearch = styled.div`
  flex: 1 1 20em;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
`;

const CollectionName = styled.h2`
  color: ${(props) => props.theme.text};
  font-weight: 800;
  font-size: 2rem;
`;

export async function loadSearchPageData({ request }: { request: Request }) {
  const url = new URL(request.url);
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().replace(/\s+/, "_"));

  const collection = url.searchParams.get("collection");
  const alcoholic = url.searchParams.get("alcoholic");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};

  if (ingredients.length > 0 || !collection) {
    options.ingredients = ingredients;
  }

  if (collection) {
    options.collection = collection;
  }

  if (alcoholic) {
    options.alcoholic = alcoholic;
  }

  if (page) {
    options.page = page;
  }

  const result = await getCocktails(options);
  return result;
}

function SearchPage() {
  const getCocktailsData = useLoaderData() as Awaited<
    ReturnType<typeof getCocktails>
  >;
  const { state, location } = useNavigation();
  const [currentSearchParams, setSearchParams] = useSearchParams();

  const currentParams = new URLSearchParams(currentSearchParams.toString());
  const allCocktails = getCocktailsData.data;
  const pageInfo = getCocktailsData.pageInfo;

  const searchParams =
    state === "loading"
      ? createSearchParams(location?.search)
      : currentSearchParams;
  const ingredients = new Set(searchParams.getAll("ingredients[]"));
  const alcoholParams = searchParams.get("alcoholic");

  function setIngredients(newIngredients: Set<string>) {
    currentParams.delete("ingredients[]");
    currentParams.delete("page");
    if (newIngredients.size > 0) {
      newIngredients.forEach((ing) =>
        currentParams.append("ingredients[]", ing)
      );
    }
    setSearchParams(currentParams);
  }

  function setAlcohol(value: string | undefined) {
    if (value === undefined) {
      currentParams.delete("alcoholic");
    } else {
      currentParams.set("alcoholic", value);
      currentParams.delete("page"); // reset page when alcoholic filter applied
    }

    setSearchParams(currentParams);
  }

  function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
    inputValue: string,
    setInputValue: (value: string) => void
  ) {
    e.preventDefault();

    if (inputValue === "") {
      return;
    }

    const newIngredients = new CaseInsensitiveSet(ingredients);
    newIngredients.add(inputValue.trim());

    setIngredients(newIngredients);
    setInputValue("");
  }

  const currentCollection = currentSearchParams.get("collection"); // to display name of the collection

  const cocktailCards = allCocktails.map((cocktail) => {
    return (
      <CocktailCard
        id={cocktail.id}
        cocktailName={cocktail.cocktailName}
        picture={cocktail.pictureURL}
        key={cocktail.id}
      />
    );
  });

  return (
    <Layout>
      <InnerWrapper>
        <CocktailsSearch>
          {currentCollection && (
            <CollectionName>
              {`${currentCollection.toLocaleUpperCase()} COCKTAILS`}
            </CollectionName>
          )}
          <FormWrapper>
            <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
            />
            <AlcoholicOrNonFilter
              setValue={setAlcohol}
              alcoholParams={alcoholParams}
            />
          </FormWrapper>

          {state === "loading" ? (
            <Loader />
          ) : cocktailCards.length > 0 ? (
            <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
          ) : (
            <ErrorMessage>
              Unfortunately, we do not have cocktails according to your requests
              &#128557;
            </ErrorMessage>
          )}
        </CocktailsSearch>
      </InnerWrapper>
      <Pagination
        isDisabled={
          state === "loading" ||
          cocktailCards.length === 0 ||
          pageInfo.totalPages === 1
        }
        currentPageNumber={pageInfo.currentPage}
        totalPagesNumber={pageInfo.totalPages}
      />
    </Layout>
  );
}

export default SearchPage;
