import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Input from "../../atoms/Input";
import Ingredient from "../../atoms/SearchIngredient";
import { SearchButtonAccent } from "../../atoms/SearchButton";
import ResetButton from "../../atoms/ResetButton";
import Autocomplete from "../Autocomplete";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import { getIngredientsByName } from "../../../api/getIngredientsByName";
import styles from "./styles.module.css";

interface IngredientsFilterFormProps {
  ingredients: Set<string>;
  setIngredients: (ingredients: Set<string>) => void;
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    inputValue: string,
    setInputValue: (value: string) => void,
  ) => void;
}

function IngredientsFilterForm({
  ingredients,
  setIngredients,
  handleFormSubmit,
}: IngredientsFilterFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteIngredients, setAutocompleteIngredients] = useState<string[]>([]);
  const [isAutocompleteIngredientsLoading, setIsAutocompleteIngredientsLoading] = useState(false);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleAutocomplete(e: React.FocusEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsAutocompleteOpen(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const splitted = e.target.value.split(",").map((el) => el);
    if (splitted.length > 1) {
      const filtered = splitted.filter((el) => el !== "");
      const newIngredients = new CaseInsensitiveSet([...ingredients, ...filtered]);
      setIngredients(newIngredients);
      setInputValue("");
      return;
    }
    setInputValue(e.target.value);
  }

  function removeIngredient(index: number) {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(new Set(newIngredients));
  }

  const handleSubmitWrapper = (e: FormEvent<HTMLFormElement>) => {
    handleFormSubmit(e, inputValue, setInputValue);
  };

  useEffect(() => {
    setIsAutocompleteIngredientsLoading(true);
    const abortController = new AbortController();
    (async () => {
      if (inputValue === "") {
        setAutocompleteIngredients([]);
        return;
      }
      try {
        const autocompleteIngredients = await getIngredientsByName(inputValue, abortController.signal);
        const ingredientNames = autocompleteIngredients.map((ing) => ing.name);
        setAutocompleteIngredients(ingredientNames);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          throw err;
        }
      }
      setIsAutocompleteIngredientsLoading(false);
      setIsAutocompleteOpen(true);
    })();
    return () => { abortController.abort(); };
  }, [inputValue]);

  const isButtonsHidden = ingredients.size === 0 && inputValue === "";

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmitWrapper}
      onBlur={(e) => toggleAutocomplete(e)}
    >
      <div className={styles.formContentWrapper}>
        <div
          className={styles.combobox}
          onClick={() => inputRef.current?.focus()}
        >
          <div className={styles.tagsInputWrapper}>
            {[...ingredients].map((ingredient, i) => (
              <Ingredient
                key={ingredient}
                ingredient={ingredient}
                removeIngredient={() => removeIngredient(i)}
              />
            ))}
            <Input
              className={styles.transparentInput}
              id="tags-input"
              type="text"
              placeholder={[...ingredients].length > 0 ? "" : "Lime"}
              name="search"
              onChange={handleChange}
              value={inputValue}
              ref={inputRef}
              autoComplete="off"
            />
          </div>
          <div className={isButtonsHidden ? styles.buttonsWrapperHidden : styles.buttonsWrapper}>
            <div className={styles.devider} />
            <ResetButton
              onClick={(e) => {
                e.preventDefault();
                setIngredients(new Set(null));
                setInputValue("");
              }}
            />
          </div>
        </div>
        <div className={styles.submitButtonWrapper}>
          <SearchButtonAccent />
        </div>
      </div>
      {isAutocompleteOpen && inputValue.trim().length > 0 && (
        <Autocomplete
          className={styles.styledAutocomplete}
          isLoading={isAutocompleteIngredientsLoading}
          items={autocompleteIngredients}
          setItem={(item) => {
            const newIngredients = [...ingredients, item];
            setIngredients(new Set(newIngredients));
            setInputValue("");
            setIsAutocompleteOpen(false);
            inputRef.current?.focus();
          }}
        />
      )}
    </form>
  );
}

export default IngredientsFilterForm;
