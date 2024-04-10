import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export type CocktailsOptions = {
  ingredients?: string[];
  collection?: string;
  alcoholic?: string;
  page?: string;
};

type CocktailsResult = {
  data: Cocktail[];
  pageInfo: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
};

export default async function getCocktails(options: CocktailsOptions) {
  const { ingredients, collection, alcoholic, page } = options;

  const url = new URL("https://cocktails-api.mooo.com/cocktails?");

  if (ingredients && ingredients.length > 0) {
    ingredients.forEach((ing) => {
      url.searchParams.append("ingredients[]", ing.trim().replace("_", "%20"));
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

  const response = await get<CocktailsResult>(url.toString());
  return response;
}
