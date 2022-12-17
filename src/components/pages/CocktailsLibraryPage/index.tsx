import { useEffect, useState } from "react";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import getCocktailByName from "../../../api/getCocktailByName";
import { CocktailByName } from "../../../types/CocktailByName";
import CocktailCard from "../../atoms/CocktailCard";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import SearchForm from "../../organisms/SearchForm";
import Layout from "../../templates/Layout";

const FormWrapper = styled.div`
  margin-bottom: 2em;
`;

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
    return getCocktailByName("A");
  }
  return getCocktailByName(searchParam);
};

export default function CocktailsLibraryPage() {
  const [searchInputValue, setSearchInputValue] = useState("");

  const [, setSearchParams] = useSearchParams();
  const cocktailsData = useLoaderData() as CocktailByName;
  const { state } = useNavigation();

  useEffect(() => {
    if (searchInputValue) {
      setSearchParams({ name: searchInputValue });
    } else {
      setSearchParams();
    }
  }, [searchInputValue]);

  const cocktails = cocktailsData?.drinks?.map((drink) => {
    return (
      <CocktailCard
        cocktailName={drink.strDrink.toUpperCase()}
        picture={drink.strDrinkThumb}
        id={drink.idDrink}
        key={drink.idDrink}
        higlight={searchInputValue}
      />
    );
  });

  return (
    <Layout>
      <FormWrapper>
        <SearchForm
          inputValue={searchInputValue}
          setInputValue={setSearchInputValue}
          title="Cocktail name"
        />
      </FormWrapper>
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
