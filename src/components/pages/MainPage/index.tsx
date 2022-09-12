import { useEffect, useState } from "react";

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

  const [run, state] = useAsync(() =>
    get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
    )
  );

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
