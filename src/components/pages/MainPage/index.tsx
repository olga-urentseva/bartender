import { useEffect, useState } from "react";
import styled from "styled-components";
import { get } from "../../../lib/http";

import CoctailCard from "../../atoms/CoctailCard";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2em 5em;
  justify-content: space-between;
  align-content: flex-start;
  margin: 3em 0;
`;

const CoctailCardsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  flex: 1 1 30em;
  flex-direction: row;
  flex-wrap: wrap;
`;

function MainPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <Layout>
      <InnerWrapper>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} />
        <CoctailCardsWrapper>
          <CoctailCard
            url="https:\/\/www.thecocktaildb.com\/images\/media\/drink\/b7qzo21493070167.jpg"
            coctailName="Amaretto"
          />
        </CoctailCardsWrapper>
      </InnerWrapper>
    </Layout>
  );
}

export default MainPage;
