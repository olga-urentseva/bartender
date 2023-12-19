import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export interface GetCocktailsOptions {
  ingredients?: string[];
  collection?: string;
  isAlcoholic?: string;
}

export default async function getCocktails(options: GetCocktailsOptions) {
  const { ingredients, collection, isAlcoholic } = options;

  if ((!ingredients || ingredients.length === 0) && !collection) {
    return [];
  }

  let url = "https://bartender-api.mooo.com/cocktails?";

  if (ingredients && ingredients.length > 0) {
    url += ingredients
      .map((ing) => `ingredients[]=${ing.trim().replace("_", "%20")}`)
      .join("&");
  }

  if (collection) {
    url += `&collection=${collection}`;
  }

  if (isAlcoholic) {
    console.log(isAlcoholic);
    url += `&isAlcoholic=${isAlcoholic}`;
  }

  const cocktails = await get<Cocktail[]>(url);

  return cocktails;
}
