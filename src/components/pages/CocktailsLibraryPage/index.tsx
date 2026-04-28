import { useLoaderData, useNavigation, useSearchParams } from "react-router-dom";
import { CocktailsOptions, getCocktails } from "../../../api/getCocktails";
import CocktailCard from "../../atoms/CocktailCard";
import ErrorMessage from "../../atoms/ErrorMessage";
import Layout from "../../templates/Layout";
import SearchCocktailsForm from "./SearchCocktailsForm";
import Pagination from "../../organisms/Pagination";
import Loader from "../../atoms/Loader";
import styles from "./styles.module.css";

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};
  if (name) options.name = name;
  if (page) options.page = page;

  return getCocktails(options);
};

export default function CocktailsLibraryPage() {
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const currentName = currentSearchParams.get("name")?.replaceAll(",", ", ") || "";

  const apiData = useLoaderData() as Awaited<ReturnType<typeof getCocktails>>;
  const { state } = useNavigation();

  function setCocktailName(name: string) {
    setSearchParams(name ? { name: name.toLocaleLowerCase() } : {});
  }

  const cocktailsData = apiData.cocktails;
  const pageInfo = apiData.pagination;

  const cocktailCards = cocktailsData?.map((cocktail) => (
    <CocktailCard
      cocktailName={cocktail.name}
      picture={cocktail.pictureURL}
      id={cocktail.id}
      key={cocktail.id}
      highlight={currentName}
    />
  ));

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
        <div className={styles.cocktailCardsWrapper}>{cocktailCards}</div>
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
      />
    </Layout>
  );
}
