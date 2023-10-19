export type Cocktail = {
  id: string;
  cocktailName: string;
  instruction: string;
  pictureURL: string;
  isAlcoholic: string;
  ingredients: {
    id: string;
    measure: string;
  }[];
};
