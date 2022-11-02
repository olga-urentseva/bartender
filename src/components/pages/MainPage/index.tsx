import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import useDebouncedValue from "../../../hooks/useDebouncedValue";
import { CocktailByIngredient } from "../../../types/CocktailByIngredient";
import getCocktailsByIngredients from "../../../api/getCocktailsByIngredients";

import CocktailCard from "../../atoms/CocktailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

const FormWrapper = styled.div`
  margin-bottom: 2em;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-auto-rows: max-content;
`;

export async function MainPageLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.get("ingredient")?.split(",");
  return getCocktailsByIngredients(searchParams);
}

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const inputValueWithDefault = inputValue || "lime";

  const cocktailsData = useLoaderData() as CocktailByIngredient[];

  const debouncedInputValue = useDebouncedValue<string>(inputValue, 300);

  const inputIngredients = useMemo(
    () =>
      inputValueWithDefault
        .split(",")
        .map((i) => i.trim().replace(/\s+/, "_"))
        .filter((i) => i.length > 0)
        .join(","),
    [inputValue]
  );

  useEffect(() => {
    setSearchParams({ ingredient: inputIngredients || "lime" });
  }, [debouncedInputValue]);

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
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
      </FormWrapper>
      <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
    </Layout>
  );
}

export default MainPage;
