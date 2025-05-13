import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export default async function getCocktailsByIngredients(
  ingredients: string[] | undefined,
) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const url = `https://bartender-api.mooo.com/cocktails?${ingredients
    .map((ing) => `ingredients[]=${ing.trim()}`)
    .join("&")}`;

  const cocktails = await get<Cocktail[]>(url);

  return cocktails;
}
