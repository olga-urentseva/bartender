import styles from "./styles.module.css";

function Ingredient({
  ingredient,
  removeIngredient,
}: {
  ingredient: string;
  removeIngredient: ({ ingredient }: { ingredient: string }) => void;
}) {
  return (
    <div className={styles.ingredientItem}>
      {ingredient}
      <button
        type="button"
        title="Remove"
        className={styles.deleteButton}
        onClick={() => removeIngredient({ ingredient })}
      >
        ×
      </button>
    </div>
  );
}

export default Ingredient;
