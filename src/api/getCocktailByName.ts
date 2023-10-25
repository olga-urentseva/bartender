import { get } from "../lib/http";

import { Cocktail } from "../types/Cocktail";

export default async function getCocktailByName(name: string) {
  const response = await get<Cocktail[]>(
    `https://bartender-api.mooo.com/cocktails?name=${name}`
  );

  if (!response) {
    return null;
  }
  return response;
}
