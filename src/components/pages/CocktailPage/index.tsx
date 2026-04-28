import { Params, useLoaderData } from "react-router-dom";
import { Cocktail } from "../../../types/Cocktail";
import Layout from "../../templates/Layout";
import CocktailInfo from "../../organisms/CocktailInfo";
import Loader from "../../atoms/Loader";
import getCocktailById from "../../../api/getCocktailById";

export async function loader({ params }: { params: Params }) {
  const response = await getCocktailById(params.cocktailId);
  return response;
}

const CocktailPage = () => {
  const cocktailData = useLoaderData() as Cocktail;

  return (
    <Layout>
      <div>
        {!cocktailData ? <Loader /> : null}
        {cocktailData && <CocktailInfo data={cocktailData} />}
      </div>
    </Layout>
  );
};

export default CocktailPage;
