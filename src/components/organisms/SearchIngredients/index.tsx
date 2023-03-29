import styled from "styled-components";
import Ingredient from "../../atoms/SearchIngredient";

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  flex: 2 1 20em;
`;

function SearchIngredients({
  ingredients,
  setIngredientsToURL,
}: {
  ingredients: string;
  setIngredientsToURL: (ingredients: string) => void;
}) {
  console.log(ingredients);
  const ingredientList =
    ingredients === "" ? null : ingredients.split(",").map((ing) => ing.trim());

  function removeIngredient({ ingredient }: { ingredient: string }) {
    if (!ingredientList) {
      return;
    }

    const index = ingredientList.indexOf(ingredient);
    if (index > -1) {
      ingredientList?.splice(index, 1);
    }
    setIngredientsToURL(ingredientList.join());
  }

  const ingredientItoms = ingredientList?.map((ingredient) => (
    <Ingredient
      key={ingredient}
      ingredient={ingredient}
      removeIngredient={removeIngredient}
    />
  ));

  return <Wrapper>{ingredientItoms}</Wrapper>;
}

export default SearchIngredients;
