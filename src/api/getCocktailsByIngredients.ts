import { get } from "../lib/http";

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export default async function getCocktailsByIngredients(ingredients: string[]) {
  if (ingredients.length === 0) {
    return [];
  }

  const responses = (
    await Promise.all(
      ingredients.map((ing) =>
        get<{ drinks: Cocktail[] }>(
          `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`
        )
      )
    )
  ).map((response) => response?.drinks || []);

  let cocktailIdsFromPrevResponse!: string[];
  let cocktailByIdFromPrevResponse: Record<string, Cocktail> = {};

  responses.forEach((response) => {
    const tempIds: string[] = [];
    const tempCocktailsById: Record<string, Cocktail> = {};

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
