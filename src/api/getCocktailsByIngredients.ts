import { get } from "../lib/http";

export default async function getCocktailsByIngredients(ingredients: string[]) {
  const responses = await Promise.all(
    ingredients.map((ing) =>
      get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
    )
  );

  return responses;
}
