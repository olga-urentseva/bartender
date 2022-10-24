import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Status, useAsync } from "../../../hooks/useAsync";
import getCocktailById from "../../../api/getCocktailById";
import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import CocktailInfo from "../../organisms/CocktailInfo";
import { Cocktail } from "../../../types/Cocktail";

const Wrapper = styled.div``;

const CocktailPage = () => {
  const { cocktailId } = useParams();

  const [run, { data, status, error }] = useAsync(() =>
    getCocktailById(cocktailId)
  );

  useEffect(() => {
    run();
  }, []);

  let cocktail;
  if (status === Status.SUCCESS) {
    const dataDrink = data?.drinks[0];
    console.log(dataDrink);
    cocktail = <CocktailInfo data={dataDrink} />;
  }

  return (
    <Layout>
      <Wrapper>
        {status === Status.IN_PROGRESS ? <Loader /> : null}
        {cocktail}
        {status === Status.FAILURE || error ? (
          <ErrorMessage>Something went wrong. Please try again</ErrorMessage>
        ) : null}
      </Wrapper>
    </Layout>
  );
};

export default CocktailPage;
