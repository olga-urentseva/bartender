import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export type GetCocktailsOptions = {
  ingredients?: string[];
  collection?: string;
  alcoholic?: string;
  page?: string;
};

export type getCocktailsResult = {
  data: Cocktail[];
  pageInfo: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
};

export default async function getCocktails(options: GetCocktailsOptions) {
  const { ingredients, collection, alcoholic, page } = options;

  let url = "https://bartender-api.mooo.com/cocktails?";

  if (ingredients && ingredients.length > 0) {
    url += ingredients
      .map((ing) => `ingredients[]=${ing.trim().replace("_", "%20")}`)
      .join("&");
  }

  if (collection) {
    url += `&collection=${collection}`;
  }

  if (alcoholic && alcoholic !== "all") {
    const isAlcoholic = alcoholic === "alcoholic";
    url += `&isAlcoholic=${isAlcoholic}`;
  }
  if (page) {
    url += `&page=${page}`;
  }

  const response = await get<getCocktailsResult>(url);

  return response;
}
