import {
  Params,
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
import getCollectionInfoById from "../../../api/getCollectionById";

const FormWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: end;
  gap: 1em;
  flex-wrap: wrap;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: max-content;
`;

const CocktailsSearch = styled.div`
  flex: 1 1 20rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CollectionName = styled.h2`
  color: ${(props) => props.theme.text};
  font-weight: 800;
  font-size: 2rem;
  margin: 0;
`;

const CollectionDescription = styled.h3`
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  margin: 0.5rem 0 2rem 0;
  display: inline-block;
`;

export async function loadSearchPageData({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const url = new URL(request.url);

  const collectionId = params.collectionId || undefined;
  let collectionInfo:
    | {
        id: string;
        collectionName: string;
        description: string;
        imageUrl: string;
      }
    | undefined;
  if (collectionId) {
    collectionInfo = await getCollectionInfoById(collectionId);
    console.log(collectionInfo);
  }
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().replace(/\s+/, "_"));

  const alcoholic = url.searchParams.get("alcoholic");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};

  if (ingredients.length > 0 || !collectionId) {
    options.ingredients = ingredients;
  }

  if (collectionId) {
    options.collection = collectionId;
  }

  if (alcoholic) {
    options.alcoholic = alcoholic;
  }

  if (page) {
    options.page = page;
  }

  const cocktailsResult = await getCocktails(options);
  return { cocktailsData: cocktailsResult, collectionInfo: collectionInfo };
}

function SearchPage() {
  const { cocktailsData, collectionInfo } = useLoaderData() as Awaited<{
    cocktailsData: Awaited<ReturnType<typeof getCocktails>>;
    collectionInfo: Awaited<
      ReturnType<typeof getCollectionInfoById> | undefined
    >;
  }>;
  const { state, location } = useNavigation();
  const [currentSearchParams, setSearchParams] = useSearchParams();

  const currentParams = new URLSearchParams(currentSearchParams.toString());
  const allCocktails = cocktailsData;

  const pageInfo = allCocktails.pageInfo;

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
      currentParams.delete("page");
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

  const cocktailCards = allCocktails.data.map((cocktail) => {
    return (
      <CocktailCard
        id={cocktail.id}
        cocktailName={cocktail.cocktailName}
        picture={cocktail.pictureURL}
        key={cocktail.id}
      />
    );
  });

  const isItCollection = Boolean(collectionInfo);

  return (
    <Layout>
      <InnerWrapper>
        <CocktailsSearch>
          {isItCollection && collectionInfo?.collectionName && (
            <>
              <CollectionName>{collectionInfo.collectionName}</CollectionName>
              <CollectionDescription>
                {collectionInfo.description}
              </CollectionDescription>
            </>
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
