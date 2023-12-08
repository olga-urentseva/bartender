import {
  createSearchParams,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";
import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import { FormEvent } from "react";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
// import AlcoholicOrNonFilter from "./AlcoholicOrNonFilter";

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

export async function loadSearchPageData({ request }: { request: Request }) {
  const url = new URL(request.url);
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().replace(/\s+/, "_"));

  return getCocktailsByIngredients(
    ingredients.length === 0 ? ["lime"] : ingredients
  );
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

  function setIngredients(newIngredients: Set<string>) {
    setSearchParams({
      "ingredients[]": [...newIngredients],
    });
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
          <FormWrapper>
            <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
            />
            {/* <AlcoholicOrNonFilter /> */}
          </FormWrapper>
          {state === "loading" ? (
            <Loader />
          ) : cocktailCards.length > 0 ? (
            <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
          ) : (
            <ErrorMessage>
              There are no cocktails with your ingredients &#128557;
            </ErrorMessage>
          )}
        </CocktailsSearch>
      </InnerWrapper>
    </Layout>
  );
}

export default SearchPage;
