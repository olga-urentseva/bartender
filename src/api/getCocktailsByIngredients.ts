import { get } from "../lib/http";
import { CocktailByIngredient } from "../types/CocktailByIngredient";

export default async function getCocktailsByIngredients(
  ingredients: string[] | undefined
) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const responses = (
    await Promise.all(
      ingredients.map((ing) =>
        get<{ drinks: CocktailByIngredient[] }>(
          `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`
        )
      )
    )
  ).map((response) => response?.drinks || []);

  let cocktailIdsFromPrevResponse!: string[];
  let cocktailByIdFromPrevResponse: Record<string, CocktailByIngredient> = {};

  responses.forEach((response) => {
    const tempIds: string[] = [];
    const tempCocktailsById: Record<string, CocktailByIngredient> = {};

    response.forEach((cocktail) => {
      if (
        !cocktailIdsFromPrevResponse ||
        cocktailByIdFromPrevResponse[cocktail.idDrink]
      ) {
        tempIds.push(cocktail.idDrink);
        tempCocktailsById[cocktail.idDrink] = cocktail;
      }
    });
    cocktailIdsFromPrevResponse = tempIds;
    cocktailByIdFromPrevResponse = tempCocktailsById;
  });

  return cocktailIdsFromPrevResponse.map(
    (id) => cocktailByIdFromPrevResponse[id]
  );
}
