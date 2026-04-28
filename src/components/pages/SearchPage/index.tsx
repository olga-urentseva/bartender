import {
  Params,
  createSearchParams,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { FormEvent } from "react";
import CocktailCard from "../../atoms/CocktailCard";
import Layout from "../../templates/Layout";
import ErrorMessage from "../../atoms/ErrorMessage";
import IngredientsFilterForm from "../../organisms/IngredientsFilterForm";
import Loader from "../../atoms/Loader";
import AlcoholicOrNonFilter from "./AlcoholicOrNonFilter";
import Pagination from "../../organisms/Pagination";
import HalloweenSpider from "../../atoms/HalloweenSpider";
import Snowfall from "../../atoms/Snowfall";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import getCollectionInfoById from "../../../api/getCollectionById";
import { getCocktails, CocktailsOptions } from "../../../api/getCocktails";
import styles from "./styles.module.css";

enum CollectionsWithAdElements {
  Christmas = "christmas",
  Halloween = "halloween",
}

const collectionComponents = {
  [CollectionsWithAdElements.Christmas]: <Snowfall />,
  [CollectionsWithAdElements.Halloween]: <HalloweenSpider />,
};

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
    | { id: string; name: string; description: string; imageURL: string }
    | undefined;
  if (collectionId) {
    collectionInfo = await getCollectionInfoById(collectionId);
  }
  const ingredients = url.searchParams
    .getAll("ingredients[]")
    .map((el) => el.toLowerCase().trim());
  const alcoholic = url.searchParams.get("alcoholic");
  const page = url.searchParams.get("page");

  const options: CocktailsOptions = {};
  if (ingredients.length > 0 || !collectionId) options.ingredients = ingredients;
  if (collectionId) options.collection = collectionId;
  if (alcoholic) options.alcoholic = alcoholic;
  if (page) options.page = page;

  const cocktailsResult = await getCocktails(options);
  return { cocktailsData: cocktailsResult, collectionInfo };
}

function SearchPage() {
  const { cocktailsData, collectionInfo } = useLoaderData() as Awaited<{
    cocktailsData: Awaited<ReturnType<typeof getCocktails>>;
    collectionInfo: Awaited<ReturnType<typeof getCollectionInfoById> | undefined>;
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
      newIngredients.forEach((ing) => currentParams.append("ingredients[]", ing));
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
    if (inputValue === "") return;
    const newIngredients = new CaseInsensitiveSet(ingredients);
    newIngredients.add(inputValue.trim());
    setIngredients(newIngredients);
    setInputValue("");
  }

  const cocktailCards = allCocktails.cocktails.map((cocktail) => (
    <CocktailCard
      id={cocktail.id}
      cocktailName={cocktail.name}
      picture={cocktail.pictureURL}
      key={cocktail.id}
    />
  ));

  const isItCollection = Boolean(collectionInfo?.name);

  const getCollectionComponent = () => {
    if (!isItCollection || !collectionInfo?.id) return null;
    const collectionId = collectionInfo.id.toLowerCase() as CollectionsWithAdElements;
    return collectionComponents[collectionId] || null;
  };

  return (
    <Layout>
      {isItCollection && getCollectionComponent()}
      <div className={styles.innerWrapper}>
        <div className={styles.cocktailsSearch}>
          {isItCollection && collectionInfo?.name && (
            <>
              <h2 className={styles.collectionName}>{collectionInfo.name}</h2>
              <h3 className={styles.collectionDescription}>
                {collectionInfo.description}
              </h3>
            </>
          )}
          <h2 className={styles.formText}>What do you have in your bar?</h2>
          <div className={styles.formWrapper}>
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
          </div>

          {state === "loading" ? (
            <Loader />
          ) : cocktailCards.length > 0 ? (
            <div className={styles.cocktailCardsWrapper}>{cocktailCards}</div>
          ) : (
            <ErrorMessage>
              Unfortunately, we do not have cocktails according to your requests
              &#128557;
            </ErrorMessage>
          )}
        </div>
      </div>
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
