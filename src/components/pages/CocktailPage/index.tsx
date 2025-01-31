import { Params, useLoaderData } from "react-router-dom";
import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";

import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import CocktailInfo from "../../organisms/CocktailInfo";
import getCocktailById from "../../../api/getCocktailById";

const Wrapper = styled.div``;
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
