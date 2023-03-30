import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { CocktailByIngredient } from "../../../types/CocktailByIngredient";
import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import SearchIngredients from "../../organisms/SearchIngredients";

const FormWrapper = styled.div`
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-auto-rows: max-content;
`;

export async function MainPageLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("ingredients")?.split(",");
  if (!searchParams) {
    return getCocktailsByIngredients(["lime"]);
  }
  return getCocktailsByIngredients(searchParams);
}

function MainPage() {
  const cocktailsData = useLoaderData() as CocktailByIngredient[];
  const { state } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const fromURL = searchParams.get("ingredients")?.replaceAll(",", ", ") || "";

  function setIngredientsToURL(ingredients: string) {
    setSearchParams(
      ingredients ? { ingredients: ingredients.toLocaleLowerCase() } : {}
    );
  }

  function onSubmit(inputValue: string) {
    const handler = setTimeout(() => {
      const ingredients = inputValue
        .split(",")
        .map((i) => i.trim().replace(/\s+/, "_"))
        .filter((i) => i.length > 0)
        .join(",");

      setIngredientsToURL(ingredients);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }

  const cocktailCards = cocktailsData?.map((cocktail: CocktailByIngredient) => {
    return (
      <CocktailCard
        id={cocktail.idDrink}
        cocktailName={cocktail.strDrink}
        picture={cocktail.strDrinkThumb}
        key={cocktail.idDrink}
      />
    );
  });

  return (
    <Layout>
      <FormWrapper>
        <SearchForm
          title="What do you have in your bar?"
          onFormSubmit={onSubmit}
          items={fromURL}
        />
        <SearchIngredients
          ingredients={fromURL}
          setIngredientsToURL={setIngredientsToURL}
        />
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
    </Layout>
  );
}

export default MainPage;
