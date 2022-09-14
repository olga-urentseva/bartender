import { useEffect, useMemo, useState } from "react";

import { Status, useAsync } from "../../../hooks/useAsync";
import { get } from "../../../lib/http";
import { Cocktail } from "../../../types/Cocktail";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

import styled from "styled-components";
import Loader from "../../atoms/Loader";

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin: 3em 0;
  flex-direction: column;
`;

const CocktailCardsWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-direction: row;
  flex-wrap: wrap;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const inputIngredients = useMemo(() => {
    if (!inputValue) {
      return;
    } else {
      const ingredients = inputValue
        .split(",")

        .map((i) => i.trim().replace(" ", "_"))
        .filter((i) => i.length > 0);
      return ingredients.join("&i=");
    }
  }, [inputValue]);

  const [run, state] = useAsync(() =>
    get(
      `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${inputIngredients}`
    )
  );
  console.log(state);

  useEffect(() => {
    run();
  }, [inputValue]);

  let cocktailCards;
  if (state.status === Status.SUCCESS) {
    cocktailCards = state.data.drinks?.map((drink: Cocktail) => {
      return <CocktailCard info={drink} key={drink.idDrink} />;
    });
  }

  return (
    <Layout>
      <InnerWrapper>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
        {state.status === Status.IN_PROGRESS && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
      </InnerWrapper>
    </Layout>
  );
}

export default MainPage;
