import SearchIcon from "../SearchIcon";
import styles from "./styles.module.css";

export function SearchButton({ ...props }) {
  return (
    <button
      type="submit"
      aria-label="Search"
      title="Search"
      className={styles.button}
      {...props}
    >
      <SearchIcon />
    </button>
  );
}

export function SearchButtonAccent({ ...props }) {
  return (
    <button
      type="submit"
      aria-label="Search"
      title="Search"
      className={styles.buttonAccent}
      {...props}
    >
      <SearchIcon />
    </button>
  );
}
