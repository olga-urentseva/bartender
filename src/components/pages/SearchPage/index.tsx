import {
  createSearchParams,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";

import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import { FormEvent } from "react";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import getCocktails, { GetCocktailsOptions } from "../../../api/getCocktails";
import AlcoholicOrNonFilter, {
  AlcoholFilterValues,
} from "./AlcoholicOrNonFilter";

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
  const isAlcoholic = url.searchParams.get("isAlcoholic");

  const options = {} as GetCocktailsOptions;

  if (ingredients.length > 0 || (ingredients.length === 0 && !collection)) {
    options.ingredients = ingredients.length === 0 ? ["lime"] : ingredients;
  }

  if (collection) {
    options.collection = collection;
  }

  if (isAlcoholic) {
    options.isAlcoholic = isAlcoholic;
  }

  const result = await getCocktails(options);

  return result;
}

function SearchPage() {
  const cocktailsData = useLoaderData() as Cocktail[];
  const { state, location } = useNavigation();
  const [currentSearchParams, setSearchParams] = useSearchParams();

  const searchParams =
    state === "loading"
      ? createSearchParams(location?.search)
      : currentSearchParams;
  const ingredients = new Set(searchParams.getAll("ingredients[]"));
  const isAlcoholParams = searchParams.get("isAlcoholic");
  const isAlcohol =
    isAlcoholParams === "true"
      ? true
      : isAlcoholParams === "false"
      ? false
      : null;

  function setIngredients(newIngredients: Set<string>) {
    const currentParams = new URLSearchParams(currentSearchParams.toString());

    if (newIngredients.size === 0 && !currentParams.has("collection")) {
      currentParams.set("ingredients[]", "lime");
    }

    currentParams.delete("ingredients[]");
    newIngredients.forEach((ing) => currentParams.append("ingredients[]", ing));

    setSearchParams(currentParams);
  }

  function setAlcohol(value: AlcoholFilterValues) {
    const currentParams = new URLSearchParams(currentSearchParams.toString());
    if (value === "alcoholic") {
      currentParams.set("isAlcoholic", "true");
    }
    if (value === "nonAlcoholic") {
      currentParams.set("isAlcoholic", "false");
    }
    if (value === "default") {
      currentParams.delete("isAlcoholic");
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

  const cocktailCards = cocktailsData?.map((cocktail) => {
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
              initialState={isAlcohol}
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
    </Layout>
  );
}

export default SearchPage;
