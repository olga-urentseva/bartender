import { describe, it, beforeEach, expect } from "vitest";
import { rest } from "msw";
import MswServer from "../msw-server";
import getCocktailsByIngredients from "./getCocktailsByIngredients";

describe("getCocktailsByIngredients", () => {
  let ingredients: string[];

  beforeEach(() => {
    ingredients = ["lime", "vodka", "gin"];
  });

  it("calls API for every ingredient with correct parameters", async () => {
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

  describe("when there are no intersections", () => {
    it("returns empty array", async () => {
      const mockedResponse = [
        {
          drinks: [
            {
              strDrink: "Limoncello Spritz",
              idDrink: "1",
              strDrinkThumb: "url1",
            },
          ],
        },
        {
          drinks: [
            { strDrink: "White Russian", idDrink: "2", strDrinkThumb: "url2" },
          ],
        },
        {
          drinks: [
            {
              strDrink: "California Lemonade",
              idDrink: "3",
              strDrinkThumb: "url3",
            },
          ],
        },
      ];

      MswServer.use(
        rest.get(
          "https://thecocktaildb.com/api/json/v1/1/filter.php",
          (req, res, ctx) => {
            return res(ctx.json(mockedResponse));
          }
        )
      );

      const cocktails = await getCocktailsByIngredients(ingredients);
      expect(cocktails).toEqual([]);
    });
  });
});
