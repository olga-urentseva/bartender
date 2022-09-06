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
  const [coctails, setCoctails] = useState<any>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
    )
      .then((json) => {
        setCoctails(json);
        console.log(coctails);
      })
      .catch((error) => {
        console.error(error);

        setIsError(true);
      });
  }, [inputValue]);

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
