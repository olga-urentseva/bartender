import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export type CocktailsByNameOptions = {
  name?: string;
  page?: string;
};
type CocktailsByNameResult = {
  data: Cocktail[];
  pageInfo: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
};

export async function getCocktailsByName(options: CocktailsByNameOptions) {
  const { name, page } = options;

  const url = new URL("https://cocktails-api.mooo.com/cocktails");

  if (name) {
    url.searchParams.set("name", name);
  }
  if (page) {
    url.searchParams.set("page", String(page));
  }

  const response = await get<CocktailsByNameResult>(url.toString());

  return response;
}
