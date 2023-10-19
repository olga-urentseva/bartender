export type Cocktail = {
  id: string;
  cocktailName: string;
  instruction: string;
  pictureURL: string;
  isAlcoholic: string;
  glass: string;
  ingredients: {
    id: string;
    measure: string;
    name: string;
  }[];
};
