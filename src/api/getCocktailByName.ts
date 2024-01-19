import { get } from "../lib/http";

import { getCocktailsResult } from "./getCocktails";

export type getCocktailByNameResult = getCocktailsResult;

export async function getCocktailByName(name: string) {
  const response = await get<getCocktailByNameResult>(
    `https://bartender-api.mooo.com/cocktails?name=${name}`
  );

  if (!response) {
    return null;
  }
  return response;
}
