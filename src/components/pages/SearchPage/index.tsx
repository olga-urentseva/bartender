import {
  Params,
  createSearchParams,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";

import getCollectionInfoById from "../../../api/getCollectionById";
import { getCocktails, CocktailsOptions } from "../../../api/getCocktails";

import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import { FormEvent } from "react";

import AlcoholicOrNonFilter from "./AlcoholicOrNonFilter";
import Pagination from "../../organisms/Pagination";

import HalloweenSpider from "../../atoms/HalloweenSpider";
import Snowfall from "../../atoms/Snowfall";

enum CollectionsWithAdElements {
  Christmas = "christmas",
  Halloween = "halloween",
}

const collectionComponents = {
  [CollectionsWithAdElements.Christmas]: <Snowfall />,
  [CollectionsWithAdElements.Halloween]: <HalloweenSpider />,
};

const FormWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: start;
  gap: 1em;
  flex-wrap: wrap;
`;

const CocktailCardsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: max-content;
`;

const CocktailsSearch = styled.div`
  flex: 1 1 20rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;

const CollectionName = styled.h2`
  color: ${(props) => props.theme.text};
  font-weight: 800;
  font-size: 2rem;
  margin: 0;
`;

const CollectionDescription = styled.h3`
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  margin: 0.5rem 0 2rem 0;
  display: inline-block;
`;

const FormText = styled.h2`
  font-size: 1.2em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const url = new URL(request.url);

  const collectionId = params.collectionId || undefined;
  let collectionInfo:
    | {
        id: string;
        name: string;
        description: string;
        imageURL: string;
      }
    | undefined;
  if (collectionId) {
    collectionInfo = await getCollectionInfoById(collectionId);
  }
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().replace(/\s+/, "_"));

  const alcoholic = url.searchParams.get("alcoholic");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};

  if (ingredients.length > 0 || !collectionId) {
    options.ingredients = ingredients;
  }

  if (collectionId) {
    options.collection = collectionId;
  }

  if (alcoholic) {
    options.alcoholic = alcoholic;
  }

  if (page) {
    options.page = page;
  }

  const cocktailsResult = await getCocktails(options);
  return { cocktailsData: cocktailsResult, collectionInfo: collectionInfo };
}

function SearchPage() {
  const { cocktailsData, collectionInfo } = useLoaderData() as Awaited<{
    cocktailsData: Awaited<ReturnType<typeof getCocktails>>;
    collectionInfo: Awaited<
      ReturnType<typeof getCollectionInfoById> | undefined
    >;
  }>;

  const { state, location } = useNavigation();
  const [currentSearchParams, setSearchParams] = useSearchParams();

  const currentParams = new URLSearchParams(currentSearchParams.toString());
  const allCocktails = cocktailsData;

  const pageInfo = allCocktails.pagination;
  const additionalData = allCocktails.additionalData;

  const searchParams =
    state === "loading"
      ? createSearchParams(location?.search)
      : currentSearchParams;
  const ingredients = new Set(searchParams.getAll("ingredients[]"));
  const alcoholParams = searchParams.get("alcoholic");

  function setIngredients(newIngredients: Set<string>) {
    currentParams.delete("ingredients[]");
    currentParams.delete("page");
    if (newIngredients.size > 0) {
      newIngredients.forEach((ing) =>
        currentParams.append("ingredients[]", ing),
      );
    }
    setSearchParams(currentParams);
  }

  function setAlcohol(value: string | undefined) {
    if (value === undefined) {
      currentParams.delete("alcoholic");
    } else {
      currentParams.set("alcoholic", value);
      currentParams.delete("page");
    }

    setSearchParams(currentParams);
  }

  function handleFormSubmit(
    e: FormEvent<HTMLFormElement>,
    inputValue: string,
    setInputValue: (value: string) => void,
  ) {
    e.preventDefault();

    if (inputValue === "") {
      return;
    }

    const newIngredients = new CaseInsensitiveSet(ingredients);
    newIngredients.add(inputValue.trim());

    setIngredients(newIngredients);
    setInputValue("");
  }

  const cocktailCards = allCocktails.cocktails.map((cocktail) => {
    return (
      <CocktailCard
        id={cocktail.id}
        cocktailName={cocktail.name}
        picture={cocktail.pictureURL}
        key={cocktail.id}
      />
    );
  });

  const isItCollection = Boolean(collectionInfo?.name);

  const getCollectionComponent = () => {
    if (!isItCollection || !collectionInfo?.id) return null;

    const collectionId =
      collectionInfo.id.toLowerCase() as CollectionsWithAdElements;
    return collectionComponents[collectionId] || null;
  };

  return (
    <Layout>
      {isItCollection && getCollectionComponent()}
      <InnerWrapper>
        <CocktailsSearch>
          {isItCollection && collectionInfo?.name && (
            <>
              <CollectionName>{collectionInfo.name}</CollectionName>
              <CollectionDescription>
                {collectionInfo.description}
              </CollectionDescription>
            </>
          )}
          <FormText>What do you have in your bar?</FormText>
          <FormWrapper>
            <IngredientsFilterForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              handleFormSubmit={handleFormSubmit}
            />
            <AlcoholicOrNonFilter
              setValue={setAlcohol}
              alcoholParams={alcoholParams}
              numberOfCocktails={additionalData.numberOfCocktails}
            />
          </FormWrapper>

          {state === "loading" ? (
            <Loader />
          ) : cocktailCards.length > 0 ? (
            <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
          ) : (
            <ErrorMessage>
              Unfortunately, we do not have cocktails according to your requests
              &#128557;
            </ErrorMessage>
          )}
        </CocktailsSearch>
      </InnerWrapper>
      <Pagination
        isDisabled={
          state === "loading" ||
          cocktailCards.length === 0 ||
          pageInfo.totalPages === 1
        }
        currentPageNumber={pageInfo.currentPage}
        totalPagesNumber={pageInfo.totalPages}
      />
    </Layout>
  );
}

export default SearchPage;
