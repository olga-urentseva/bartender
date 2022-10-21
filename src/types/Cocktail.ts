type Ingredient1 =
  | {
      strIngredient1: string;
      strMeasure1: string;
    }
  | {
      strIngredient1: null;
      strMeasure1: null;
    };

type Ingredient2 =
  | {
      strIngredient2: string;
      strMeasure2: string;
    }
  | {
      strIngredient2: null;
      strMeasure2: null;
    };

type Ingredient3 =
  | {
      strIngredient3: string;
      strMeasure3: string;
    }
  | {
      strIngredient3: null;
      strMeasure3: null;
    };

type Ingredient4 =
  | {
      strIngredient4: string;
      strMeasure4: string;
    }
  | {
      strIngredient4: null;
      strMeasure4: null;
    };

type Ingredient5 =
  | {
      strIngredient5: string;
      strMeasure5: string;
    }
  | {
      strIngredient5: null;
      strMeasure5: null;
    };

type Ingredient6 =
  | {
      strIngredient6: string;
      strMeasure6: string;
    }
  | {
      strIngredient6: null;
      strMeasure6: null;
    };

type Ingredient7 =
  | {
      strIngredient7: string;
      strMeasure7: string;
    }
  | {
      strIngredient7: null;
      strMeasure7: null;
    };

type Ingredient8 =
  | {
      strIngredient8: string;
      strMeasure8: string;
    }
  | {
      strIngredient8: null;
      strMeasure8: null;
    };

type Ingredient9 =
  | {
      strIngredient9: string;
      strMeasure9: string;
    }
  | {
      strIngredient9: null;
      strMeasure9: null;
    };

type Ingredient10 =
  | {
      strIngredient10: string;
      strMeasure10: string;
    }
  | {
      strIngredient10: null;
      strMeasure10: null;
    };

type Ingredient11 =
  | {
      strIngredient11: string;
      strMeasure11: string;
    }
  | {
      strIngredient11: null;
      strMeasure11: null;
    };

type Ingredient12 =
  | {
      strIngredient12: string;
      strMeasure12: string;
    }
  | {
      strIngredient12: null;
      strMeasure12: null;
    };

type Ingredient13 =
  | {
      strIngredient13: string;
      strMeasure13: string;
    }
  | {
      strIngredient13: null;
      strMeasure13: null;
    };

type Ingredient14 =
  | {
      strIngredient14: string;
      strMeasure14: string;
    }
  | {
      strIngredient14: null;
      strMeasure14: null;
    };

type Ingredient15 =
  | {
      strIngredient15: string;
      strMeasure15: string;
    }
  | {
      strIngredient15: null;
      strMeasure15: null;
    };

export type Cocktail = {
  idDrink: string;
  strDrink: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  strGlass: string;
  strInstructions: string;
  strCategory: string;
} & Ingredient1 &
  Ingredient2 &
  Ingredient3 &
  Ingredient4 &
  Ingredient5 &
  Ingredient6 &
  Ingredient7 &
  Ingredient8 &
  Ingredient9 &
  Ingredient10 &
  Ingredient11 &
  Ingredient12 &
  Ingredient13 &
  Ingredient14 &
  Ingredient15;
