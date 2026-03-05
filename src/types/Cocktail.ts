export type Cocktail = {
  cocktail: {
    id: string;
    name: string;
    instruction: string;
    pictureURL: string;
    isAlcoholic: string;
    glass: string;
    credits?: string | null;
  };

  ingredients: {
    id: string;
    measure: string;
    name: string;
  }[];
};
