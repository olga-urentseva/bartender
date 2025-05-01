import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";

import { CocktailsOptions, getCocktails } from "../../../api/getCocktails";

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

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};

  if (name) {
    options.name = name;
  }
  if (page) {
    options.page = page;
  }

  return getCocktails(options);
};

export default function CocktailsLibraryPage() {
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const currentName =
    currentSearchParams.get("name")?.replaceAll(",", ", ") || "";

  const apiData = useLoaderData() as Awaited<ReturnType<typeof getCocktails>>;
  const { state } = useNavigation();

  function setCocktailName(name: string) {
    setSearchParams(name ? { name: name.toLocaleLowerCase() } : {});
  }

  const cocktailsData = apiData.cocktails;
  const pageInfo = apiData.pagination;

  const cocktailCards = cocktailsData?.map(({ id, pictureURL, name }) => {
    return (
      <CocktailCard
        cocktailName={name}
        picture={pictureURL}
        id={id}
        key={id}
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
      ) : cocktailCards?.length > 0 ? (
        <CocktailCardsWrapper>{cocktailCards}</CocktailCardsWrapper>
      ) : (
        <ErrorMessage>
          There are no cocktails with this name &#128557;
        </ErrorMessage>
      )}
      <Pagination
        currentPageNumber={pageInfo.currentPage}
        totalPagesNumber={pageInfo.totalPages}
        isDisabled={
          state === "loading" ||
          cocktailCards.length === 0 ||
          pageInfo.totalPages === 1
        }
      ></Pagination>
    </Layout>
  );
}
