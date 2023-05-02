import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { CocktailByIngredient } from "../../../types/CocktailByIngredient";
import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import IngredientsFilterForm from "./IngredientsFilterForm";

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
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().replace(/\s+/, "_"));
  if (ingredients.length === 0) {
    return getCocktailsByIngredients(["lime"]);
  }
  return getCocktailsByIngredients(ingredients);
}

function MainPage() {
  const cocktailsData = useLoaderData() as CocktailByIngredient[];
  const { state } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ingredients = new Set(searchParams.getAll("ingredients[]"));

  function setIngredients(newIngredients: Set<string>) {
    setSearchParams({
      "ingredients[]": [...newIngredients],
    });
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
        <IngredientsFilterForm
          ingredients={ingredients}
          setIngredients={setIngredients}
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
