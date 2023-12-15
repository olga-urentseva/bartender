import { get } from "../lib/http";
import { Cocktail } from "../types/Cocktail";

export interface GetCocktailsOptions {
  ingredients?: string[];
  collection?: string;
}

export default async function getCocktails(options: GetCocktailsOptions) {
  const { ingredients, collection } = options;

  if ((!ingredients || ingredients.length === 0) && !collection) {
    return [];
  }

  let url = "https://bartender-api.mooo.com/cocktails?";

  if (ingredients && ingredients.length > 0) {
    console.log(ingredients);
    url += ingredients
      .map((ing) => `ingredients[]=${ing.trim().replace("_", "%20")}`)
      .join("&");
  }

  if (collection) {
    url += `&collection=${collection}`;
  }

  console.log(url.toString());
  const cocktails = await get<Cocktail[]>(url);

  return cocktails;
}
