import { get } from "../lib/http";

import { Cocktail } from "../types/Cocktail";

export default async function getCocktailByName(name: string) {
  const response = await get<{ drinks: Cocktail[] }>(
    `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
  );

  if (!response) {
    return null;
  }
  return response;
}
