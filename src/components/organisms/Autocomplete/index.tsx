import AutocompleteLoader from "./AutocompleteLoader";
import styles from "./styles.module.css";

type AutocompleteProps = {
  items: string[];
  setItem: (item: string) => void;
  isLoading: boolean;
  className?: string;
};

export default function Autocomplete({
  items,
  setItem,
  isLoading,
  className,
}: AutocompleteProps) {
  const suggestions = items.map((item) => (
    <div
      key={item}
      className={styles.autocompleteItem}
      onClick={() => setItem(item)}
      tabIndex={0}
    >
      {item}
    </div>
  ));

  return (
    <div className={`${styles.innerWrapper}${className ? ` ${className}` : ""}`}>
      {isLoading ? (
        <AutocompleteLoader />
      ) : suggestions.length === 0 ? (
        <p className={styles.noItemsText}>There are no such ingredients...</p>
      ) : (
        suggestions
      )}
    </div>
  );
}
