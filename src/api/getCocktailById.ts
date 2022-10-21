import { get } from "../lib/http";

export default async function getCocktailById(id: string | undefined) {
  if (!id) {
    return [];
  }

  return await get(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
}
