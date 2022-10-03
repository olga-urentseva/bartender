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

    it("returns an empty array", async () => {
      const cocktails = await getCocktailsByIngredients(ingredients);
      expect(cocktails).toEqual([]);
    });
  });

  describe("when there is 1 intersection", () => {
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
                      {
                        strDrink: "Amaretto",
                        idDrink: "2",
                        strDrinkThumb: "url2",
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
                      {
                        strDrink: "Limoncello Spritz",
                        idDrink: "1",
                        strDrinkThumb: "url1",
                      },
                    ],
                  })
                );
              case "gin":
                return res(
                  ctx.json({
                    drinks: [
                      {
                        strDrink: "Gin Tonic",
                        idDrink: "3",
                        strDrinkThumb: "url3",
                      },
                      {
                        strDrink: "Limoncello Spritz",
                        idDrink: "1",
                        strDrinkThumb: "url1",
                      },
                    ],
                  })
                );
            }
          }
        )
      );
    });
    it("returns an array with 1 element", async () => {
      const expectedResult = [
        {
          strDrink: "Limoncello Spritz",
          idDrink: "1",
          strDrinkThumb: "url1",
        },
      ];
      const cocktails = await getCocktailsByIngredients(ingredients);
      expect(cocktails).toEqual(expectedResult);
    });
  });
  describe("when there is 2 intersections", () => {
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
                      {
                        strDrink: "Amaretto",
                        idDrink: "2",
                        strDrinkThumb: "url2",
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
                      {
                        strDrink: "Limoncello Spritz",
                        idDrink: "1",
                        strDrinkThumb: "url1",
                      },
                      {
                        strDrink: "Amaretto",
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
                        strDrink: "Amaretto",
                        idDrink: "2",
                        strDrinkThumb: "url2",
                      },
                      {
                        strDrink: "Gin Tonic",
                        idDrink: "3",
                        strDrinkThumb: "url3",
                      },
                      {
                        strDrink: "Limoncello Spritz",
                        idDrink: "1",
                        strDrinkThumb: "url1",
                      },
                    ],
                  })
                );
            }
          }
        )
      );
    });

    it("returns an array with 2 elements", async () => {
      // In alphabet order
      const expectedResult = [
        {
          strDrink: "Amaretto",
          idDrink: "2",
          strDrinkThumb: "url2",
        },
        {
          strDrink: "Limoncello Spritz",
          idDrink: "1",
          strDrinkThumb: "url1",
        },
      ];
      const cocktails = await getCocktailsByIngredients(ingredients);
      expect(cocktails).toEqual(expectedResult);
    });
  });
});
