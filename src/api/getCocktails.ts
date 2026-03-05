import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

type SearchedCocktail = Cocktail["cocktail"] & { totalItems: number };

export type CocktailsOptions = {
  ingredients?: string[];
  collection?: string;
  alcoholic?: string;
  page?: string;
  name?: string;
};

type CocktailsResult = {
  cocktails: SearchedCocktail[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
};

type CocktailsResultFull = CocktailsResult & {
  additionalData: {
    numberOfCocktails: {
      alcoholic: number;
      nonAlcoholic: number;
    };
  };
};

export async function getCocktails(options: CocktailsOptions) {
  const { ingredients, collection, alcoholic, page, name } = options;

  const url = new URL("https://bartender-api.mooo.com/cocktails?");

  if (ingredients && ingredients.length > 0) {
    console.log("ingredients", ingredients);
    ingredients.forEach((ing) => {
      url.searchParams.append("ingredients[]", ing.trim());
    });
  }

  if (collection) {
    url.searchParams.set("collection", collection);
  }

  if (alcoholic && alcoholic !== "all") {
    const isAlcoholic = alcoholic === "alcoholic";
    url.searchParams.set("isAlcoholic", String(isAlcoholic));
  }

  if (page) {
    url.searchParams.set("page", String(page));
  }

  if (name) {
    url.searchParams.set("name", name);
  }

  const cocktailsListPromise = get<CocktailsResult>(url.toString());

  const alcoholicCountUrl = new URL(url);
  alcoholicCountUrl.searchParams.set("isAlcoholic", "true");
  const alcoholicCountPromise = get<{ pagination: { totalItems: number } }>(
    alcoholicCountUrl.toString(),
  );

  const nonAlcoholicCountUrl = new URL(url);
  nonAlcoholicCountUrl.searchParams.set("isAlcoholic", "false");
  const nonAlcoholicCountPromise = get<{ pagination: { totalItems: number } }>(
    nonAlcoholicCountUrl.toString(),
  );

  const [cocktailsList, alcoholicCount, nonAlcoholicCount] = await Promise.all([
    cocktailsListPromise,
    alcoholicCountPromise,
    nonAlcoholicCountPromise,
  ]);

  const response: CocktailsResultFull = {
    ...cocktailsList,
    additionalData: {
      numberOfCocktails: {
        alcoholic: alcoholicCount.pagination.totalItems,
        nonAlcoholic: nonAlcoholicCount.pagination.totalItems,
      },
    },
  };

  return response;
}
