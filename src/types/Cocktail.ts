export type Cocktail = {
  id: string;
  name: string;
  instruction: string;
  pictureURL: string;
  isAlcoholic: string;
  glass: string;
  credits?: string;
  ingredients: {
    id: string;
    measure: string;
    name: string;
  }[];
};
