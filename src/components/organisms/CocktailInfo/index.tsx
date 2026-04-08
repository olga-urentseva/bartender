import { Cocktail } from "../../../types/Cocktail";
import styles from "./styles.module.css";

type Ingredient = {
  measure: string;
  id: string;
  name: string;
};

const CocktailInfo = ({ data }: { data: Cocktail }) => {
  const recipe = data.ingredients.map((ingredient: Ingredient) => {
    const measure = ingredient.measure;
    const ingredientName = `${ingredient.name
      .charAt(0)
      .toLocaleUpperCase()}${ingredient.name.slice(1)}`;
    return (
      <h4 key={ingredient.id} className={styles.infoText}>{`${ingredientName}: ${
        measure || "up to you"
      }`}</h4>
    );
  });

  return (
    <div>
      <h2 className={styles.cocktailTitle}>{`${data.cocktail.name}`}</h2>
      <div className={styles.firstColumn}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={data.cocktail.pictureURL} />
        </div>
        <div className={styles.recipeWrapper}>
          <h3 className={styles.subTitle}>Ingredients:</h3>
          {recipe}
        </div>
      </div>
      <div className={styles.additionalInfoWrapper}>
        <h4 className={styles.infoText}>
          <strong>How to prepare:</strong> {data.cocktail.instruction}
        </h4>
        <h4 className={styles.infoText}>
          <strong>Alcoholic:</strong>{" "}
          {data.cocktail.isAlcoholic === "true" ? "Yes" : "No"}
        </h4>
        <h4 className={styles.infoText}>
          <strong>Glass:</strong> {data.cocktail.glass}
        </h4>
        {data.cocktail.credits && (
          <h4 className={styles.infoText}>
            <strong>Credits:</strong> {data.cocktail.credits}
          </h4>
        )}
      </div>
    </div>
  );
};

export default CocktailInfo;
