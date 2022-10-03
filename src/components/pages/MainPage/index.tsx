import React, { useEffect, useMemo, useState } from "react";

import { Status, useAsync } from "../../../hooks/useAsync";
import { CocktailByIngredient } from "../../../types/CocktailByIngredient";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

import styled from "styled-components";
import Loader from "../../atoms/Loader";
import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

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
  const inputValueWithDefault = inputValue || "lime";
  const inputIngredients = useMemo(
    () =>
      inputValueWithDefault
        .split(",")
        .map((i) => i.trim().replace(" ", "_"))
        .filter((i) => i.length > 0),
    [inputValue]
  );

  const [run, { data, status, error }] = useAsync(() =>
    getCocktailsByIngredients(inputIngredients)
  );

  useEffect(() => {
    run();
  }, [inputValue]);

  let cocktailCards;
  if (status === Status.SUCCESS) {
    cocktailCards = data?.map((cocktail: CocktailByIngredient) => {
      return (
        <CocktailCard
          id={cocktail.idDrink}
          cocktailName={cocktail.strDrink}
          picture={cocktail.strDrinkThumb}
          key={cocktail.idDrink}
        />
      );
    });
  }

  return (
    <Layout>
      <InnerWrapper>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
        {status === Status.IN_PROGRESS && (
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
