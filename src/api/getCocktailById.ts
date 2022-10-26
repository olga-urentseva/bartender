import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export default async function getCocktailById(id: string) {
  const response = await get<{ drinks: Cocktail[] }>(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (!response) {
    return null;
  }

  return response.drinks[0];
}
