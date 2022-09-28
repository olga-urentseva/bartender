import { describe, it, beforeEach, expect } from "vitest";
import { rest } from "msw";
import MswServer from "../msw-server";
import getCocktailsByIngredients from "./getCocktailsByIngredients";

describe("getCocktailsByIngredients", () => {
  let ingredients: string[];

  beforeEach(() => {
    ingredients = ["lime", "vodka", "gin"];
  });

  it("calls API for every ingredient", async () => {
    const calledIngredients: (string | null)[] = [];

    MswServer.use(
      rest.get(
        "https://thecocktaildb.com/api/json/v1/1/filter.php",
        (req, res, ctx) => {
          calledIngredients.push(req.url.searchParams.get("i"));

          return res(
            ctx.json({
              drinks: [],
            })
          );
        }
      )
    );

    await getCocktailsByIngredients(ingredients);
    expect(calledIngredients).toEqual(ingredients);
  });

  // describe("when there are no intersections", () => {
  //   it("returns empty array", () => {});
  // });
});
