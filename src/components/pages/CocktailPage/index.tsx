import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";

import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import CocktailInfo from "../../organisms/CocktailInfo";

const Wrapper = styled.div``;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CocktailPage = () => {
  const cocktailData = useLoaderData() as Cocktail;

  let cocktail;
  if (cocktailData) {
    cocktail = <CocktailInfo data={cocktailData} />;
  }

  return (
    <Layout>
      <Wrapper>
        {!cocktailData ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : null}
        {cocktail}
      </Wrapper>
    </Layout>
  );
};

export default CocktailPage;
