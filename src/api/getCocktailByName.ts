import { get } from "../lib/http";

import { getCocktailsResult } from "./getCocktails";

export type GetCocktailsByNameOptions = {
  name?: string;
  page?: string;
};

export type getCocktailsByNameResult = getCocktailsResult;

export async function getCocktailsByName(options: GetCocktailsByNameOptions) {
  let url = "https://bartender-api.mooo.com/cocktails?";

  const { name, page } = options;

  if (name) {
    url += `&name=${name}`;
  }
  if (page) {
    url += `&page=${page}`;
  }

  const response = await get<getCocktailsByNameResult>(url);

  if (!response) {
    return null;
  }
  return response;
}
