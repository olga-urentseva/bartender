import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export default async function getCocktailById(id: string | undefined) {
  const response = await get<Cocktail>(
    `https://bartender-api.mooo.com/cocktails/${id}`,
  );

  if (!response) {
    return null;
  }

  return response;
}
