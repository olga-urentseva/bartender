import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import getCocktailByName from "../../../api/getCocktailByName";
import { Cocktail } from "../../../types/Cocktail";

import CocktailCard from "../../atoms/CocktailCard";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import SearchCocktailsForm from "./SearchCocktailsForm";

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-auto-rows: max-content;
`;

export const CocktailsLibraryLoader = async ({
  request,
}: {
  request: Request;
}) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("name");
  if (!searchParam) {
    return getCocktailByName("Amaretto");
  }
  return getCocktailByName(searchParam);
};

export default function CocktailsLibraryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentName = searchParams.get("name")?.replaceAll(",", ", ") || "";

  const cocktailsData = useLoaderData() as Cocktail[];
  const { state } = useNavigation();

  function setCocktailName(name: string) {
    setSearchParams(name ? { name: name.toLocaleLowerCase() } : {});
  }

  const cocktails = cocktailsData?.map((drink) => {
    return (
      <CocktailCard
        cocktailName={drink.cocktailName}
        picture={drink.pictureURL}
        id={drink.id}
        key={drink.id}
        highlight={currentName}
      />
    );
  });

  return (
    <Layout>
      <SearchCocktailsForm
        key={currentName}
        setCocktailName={setCocktailName}
        currentName={currentName}
      />
      {state === "loading" ? (
        <Loader />
      ) : cocktails?.length > 0 ? (
        <CocktailCardsWrapper>{cocktails}</CocktailCardsWrapper>
      ) : (
        <ErrorMessage>
          There are no cocktails with this name &#128557;
        </ErrorMessage>
      )}
    </Layout>
  );
}
