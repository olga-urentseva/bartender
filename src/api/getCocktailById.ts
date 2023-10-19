import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export default async function getCocktailById(id: string | undefined) {
  const response = await get<{ drinks: Cocktail[] }>(
    `http://64.226.70.159/cocktails/${id}`
  );

  if (!response) {
    return null;
  }

  return response;
}
