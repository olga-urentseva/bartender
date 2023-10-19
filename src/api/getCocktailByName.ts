import { get } from "../lib/http";

import { Cocktail } from "../types/Cocktail";

export default async function getCocktailByName(name: string) {
  const response = await get<Cocktail[]>(
    `http://64.226.70.159/cocktails?name=${name}`
  );

  if (!response) {
    return null;
  }
  return response;
}
