import { FormEvent, useState } from "react";
import Input from "../../atoms/Input";
import { SearchButton } from "../../atoms/SearchButton";
import ResetButton from "../../atoms/ResetButton";
import { useNavigation } from "react-router-dom";
import styles from "./searchForm.module.css";

type SearchCocktailsFormProps = {
  setCocktailName: (input: string) => void;
  currentName: string;
};

export default function SearchCocktailsForm({
  setCocktailName,
  currentName,
}: SearchCocktailsFormProps) {
  const [inputValue, setInputValue] = useState(currentName);
  const { state } = useNavigation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof inputValue !== "string" || inputValue.length === 0) return;
    setCocktailName(inputValue);
  }

  function handleReset(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInputValue("");
    setCocktailName("");
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="cocktails-input">
        What cocktail are you looking for?
      </label>
      <div className={styles.innerWrapper}>
        <Input
          id="cocktails-input"
          type="text"
          placeholder="Name"
          name="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={state === "loading"}
        />
        <div className={styles.buttonsWrapper}>
          <ResetButton onClick={handleReset} isDisabled={!inputValue} />
          <div className={styles.devider} />
          <SearchButton />
        </div>
      </div>
    </form>
  );
}
