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

  //it("handles empty API response", () => {});

  describe.only("when there are no intersections", () => {
    beforeEach(() => {
      MswServer.use(
        rest.get(
          "https://thecocktaildb.com/api/json/v1/1/filter.php",
          (req, res, ctx) => {
            switch (req.url.searchParams.get("i")) {
              case "lime":
                return res(
                  ctx.json({
                    drinks: [
                      {
                        strDrink: "Limoncello Spritz",
                        idDrink: "1",
                        strDrinkThumb: "url1",
                      },
                    ],
                  })
                );
              case "vodka":
                return res(
                  ctx.json({
                    drinks: [
                      {
                        strDrink: "White Russian",
                        idDrink: "2",
                        strDrinkThumb: "url2",
                      },
                    ],
                  })
                );
              case "gin":
                return res(
                  ctx.json({
                    drinks: [
                      {
                        strDrink: "White Russian",
                        idDrink: "2",
                        strDrinkThumb: "url2",
                      },
                    ],
                  })
                );
            }
          }
        )
      );
    });

    it("returns empty array", async () => {
      const cocktails = await getCocktailsByIngredients(ingredients);
      expect(cocktails).toEqual([]);
    });
  });

  describe("when there is intersections", () => {
    it("returns an array with 1 element if there is 1 intersection", async () => {
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
            {
              strDrink: "Limoncello Spritz",
              idDrink: "1",
              strDrinkThumb: "url1",
            },
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
      expect(cocktails).toEqual([mockedResponse[0]]);
    });

    it("returns an array with 2 elements if there are 2 intersections", async () => {
      const mockedResponse = [
        {
          drinks: [
            {
              strDrink: "Limoncello Spritz",
              idDrink: "1",
              strDrinkThumb: "url1",
            },
            {
              strDrink: "Amaretto",
              idDrink: "4",
              strDrinkThumb: "url4",
            },
          ],
        },
        {
          drinks: [
            {
              strDrink: "Limoncello Spritz",
              idDrink: "1",
              strDrinkThumb: "url1",
            },
            {
              strDrink: "White Russian",
              idDrink: "3",
              strDrinkThumb: "url3",
            },
          ],
        },
        {
          drinks: [
            {
              strDrink: "California Lemonade",
              idDrink: "3",
              strDrinkThumb: "url3",
            },
            {
              strDrink: "Amaretto",
              idDrink: "4",
              strDrinkThumb: "url4",
            },
          ],
        },
      ];

      const expectedResult = [
        {
          strDrink: "Limoncello Spritz",
          idDrink: "1",
          strDrinkThumb: "url1",
        },
        {
          strDrink: "Amaretto",
          idDrink: "4",
          strDrinkThumb: "url4",
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
      expect(cocktails).toEqual(expectedResult);
    });
  });
});
