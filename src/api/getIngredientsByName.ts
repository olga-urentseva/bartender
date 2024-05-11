import { get } from "../lib/http";

type Ingredient = {
  name: string;
  id: string;
};

type IngredientsByNameResult = Ingredient[];

export async function getIngredientsByName(
  name: string,
  abortSignal: AbortSignal
) {
  const url = new URL("https://cocktails-api.mooo.com/ingredients");

  if (name) {
    url.searchParams.set("prefix", name.toLocaleLowerCase());
  }

  const response = (await get<IngredientsByNameResult>(url.toString(), {
    signal: abortSignal,
  })) as Ingredient[];

  return response;
}
