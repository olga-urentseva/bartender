import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import {
  getCocktailByName,
  getCocktailByNameResult,
} from "../../../api/getCocktailByName";

import CocktailCard from "../../atoms/CocktailCard";
import ErrorMessage from "../../atoms/ErrorMessage";
import Loader from "../../atoms/Loader";
import Layout from "../../templates/Layout";
import SearchCocktailsForm from "./SearchCocktailsForm";
import Pagination from "../../organisms/Pagination";

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
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const currentName =
    currentSearchParams.get("name")?.replaceAll(",", ", ") || "";

  const libraryPageData = useLoaderData() as getCocktailByNameResult;
  const { state } = useNavigation();

  const currentParams = new URLSearchParams(currentSearchParams.toString());

  function setCocktailName(name: string) {
    setSearchParams(name ? { name: name.toLocaleLowerCase() } : {});
  }

  const cocktailsData = libraryPageData.data;
  const pageInfo = libraryPageData.pageInfo;

  function nextPage() {
    const currentPageNumber = pageInfo.currentPage;
    const totalPages = pageInfo.totalPages;

    if (currentPageNumber < totalPages) {
      currentParams.set("page", String(currentPageNumber + 1));
      setSearchParams(currentParams);
    }
  }

  function prevPage() {
    const currentPageNumber = pageInfo.currentPage;

    if (currentPageNumber > 1) {
      currentParams.set("page", String(currentPageNumber - 1));
      setSearchParams(currentParams);
    }
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
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        currentPageNumber={pageInfo.currentPage}
        totalPagesNumber={pageInfo.totalPages}
        isPageLoading={state === "loading"}
      ></Pagination>
    </Layout>
  );
}
