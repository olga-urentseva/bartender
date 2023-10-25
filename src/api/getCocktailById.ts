import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export default async function getCocktailById(id: string | undefined) {
  const response = await get<{ drinks: Cocktail[] }>(
    `https://bartender-api.mooo.com/cocktail/${id}`
  );

  if (!response) {
    return null;
  }

  return response;
}
