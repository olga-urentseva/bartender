import { useEffect, useState } from "react";

import { Status, useAsync } from "../../../hooks/useAsync";
import { get } from "../../../lib/http";
import { Coctail } from "../../../types/Coctail";

import CoctailCard from "../../atoms/CoctailCard";
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

const CoctailCardsWrapper = styled.div`
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

  let coctailCards;
  if (state.status === Status.SUCCESS) {
    coctailCards = state.data.drinks?.map((drink: Coctail) => {
      return <CoctailCard info={drink} key={drink.idDrink} />;
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
        <CoctailCardsWrapper>{coctailCards}</CoctailCardsWrapper>
      </InnerWrapper>
    </Layout>
  );
}

export default MainPage;
