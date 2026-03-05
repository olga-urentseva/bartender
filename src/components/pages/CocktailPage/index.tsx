import { Params, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";

import Layout from "../../templates/Layout";
import CocktailInfo from "../../organisms/CocktailInfo";
import Loader from "../../atoms/Loader";

import getCocktailById from "../../../api/getCocktailById";

const Wrapper = styled.div``;

export async function loader({ params }: { params: Params }) {
  const response = await getCocktailById(params.cocktailId);

  return response;
}

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
          <Loader />
        ) : null}
        {cocktail}
      </Wrapper>
    </Layout>
  );
};

export default CocktailPage;
