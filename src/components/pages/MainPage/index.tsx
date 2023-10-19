import {
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
import IngredientsFilterForm from "./IngredientsFilterForm";
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
  const cocktailsData = useLoaderData() as Cocktail[];
  const { state } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const ingredients = new Set(searchParams.getAll("ingredients[]"));

  function setIngredients(newIngredients: Set<string>) {
    setSearchParams({
      "ingredients[]": [...newIngredients],
    });
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
      <FormWrapper>
        <IngredientsFilterForm
          ingredients={ingredients}
          setIngredients={setIngredients}
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
    </Layout>
  );
}

export default MainPage;
