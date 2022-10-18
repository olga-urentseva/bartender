import React, { useEffect, useMemo, useState } from "react";

import { Status, useAsync } from "../../../hooks/useAsync";
import { CocktailByIngredient } from "../../../types/CocktailByIngredient";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";
import Loader from "../../atoms/Loader";
import ErrorMessage from "../../atoms/ErrorMessage";

import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

import styled from "styled-components";

const FormWrapper = styled.div`
  margin-bottom: 2em;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  grid-auto-rows: max-content;
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
      <FormWrapper>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
        {error ? (
          <ErrorMessage>Something went wrong, please try again</ErrorMessage>
        ) : null}
      </FormWrapper>
      {status === Status.IN_PROGRESS ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : null}
      <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
    </Layout>
  );
}

export default MainPage;
