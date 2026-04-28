import styles from "./alcoholicFilter.module.css";

const POSSIBLE_VALUES = new Set(["alcoholic", "non-alcoholic", "all", null]);

const ALCOHOLIC_FILTER_CONFIG = new Map([
  [null, "alcoholic"],
  ["alcoholic", undefined],
  ["non-alcoholic", "all"],
  ["all", "non-alcoholic"],
]);

const NON_ALCOHOLIC_FILTER_CONFIG = new Map([
  [null, "non-alcoholic"],
  ["non-alcoholic", undefined],
  ["alcoholic", "all"],
  ["all", "alcoholic"],
]);

export default function AlcoholicOrNonFilter(props: {
  setValue: (value: string | undefined) => void;
  alcoholParams: string | null;
  numberOfCocktails: { alcoholic: number; nonAlcoholic: number };
}) {
  const value = POSSIBLE_VALUES.has(props.alcoholParams) ? props.alcoholParams : null;

  function handleAlcoholicOptionChange() {
    props.setValue(ALCOHOLIC_FILTER_CONFIG.get(value));
  }

  function handleNonAlcoholicOptionChange() {
    props.setValue(NON_ALCOHOLIC_FILTER_CONFIG.get(value));
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          onChange={handleAlcoholicOptionChange}
          checked={value === "alcoholic" || value === "all"}
        />
        Alcoholic
        <span className={styles.numberOfCocktailsInfo}>
          {props.numberOfCocktails.alcoholic}
        </span>
      </label>

      <label className={styles.label}>
        <input
          className={styles.checkboxInput}
          type="checkbox"
          onChange={handleNonAlcoholicOptionChange}
          checked={value === "non-alcoholic" || value === "all"}
        />
        Non-alcoholic
        <span className={styles.numberOfCocktailsInfo}>
          {props.numberOfCocktails.nonAlcoholic}
        </span>
      </label>
    </div>
  );
}
