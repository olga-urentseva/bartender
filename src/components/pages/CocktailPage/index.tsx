import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";
import useAsync, { Status } from "../../../hooks/useAsync";
import getCocktailById from "../../../api/getCocktailById";

import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import CocktailInfo from "../../organisms/CocktailInfo";

const Wrapper = styled.div``;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CocktailPage = () => {
  const { cocktailId } = useParams();

  const [run, { data, status, error }] = useAsync<Cocktail | null>(() =>
    cocktailId ? getCocktailById(cocktailId) : Promise.resolve(null)
  );

  useEffect(() => {
    run();
  }, []);

  let cocktail;
  if (status === Status.SUCCESS && data) {
    cocktail = <CocktailInfo data={data} />;
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
