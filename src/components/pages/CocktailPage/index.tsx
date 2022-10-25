import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useAsync, { Status } from "../../../hooks/useAsync";
import getCocktailById from "../../../api/getCocktailById";
import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import CocktailInfo from "../../organisms/CocktailInfo";
import { Cocktail } from "../../../types/Cocktail";

const Wrapper = styled.div``;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CocktailPage = () => {
  const { cocktailId } = useParams();

  const [run, { data, status, error }] = useAsync(() =>
    getCocktailById(cocktailId)
  );

  useEffect(() => {
    run();
  }, []);

  let cocktail;
  if (status === Status.SUCCESS && data) {
    const dataDrink = data.drinks[0];
    cocktail = <CocktailInfo data={dataDrink} />;
  }

  return (
    <Layout>
      <Wrapper>
        {status === Status.IN_PROGRESS ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : null}
        {cocktail}
        {status === Status.FAILURE ? (
          <ErrorMessage>
            Something went wrong. Please try again. Error: {error?.message}
          </ErrorMessage>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default CocktailPage;
