import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";
import Ingredient from "../../atoms/SearchIngredient";
import SearchButton from "../../atoms/SearchButton";
import ResetButton from "../../atoms/ResetButton";
import Autocomplete from "../Autocomplete";

import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import { getIngredientsByName } from "../../../api/getIngredientsByName";

const Form = styled.form<{
  onBlur: (e: React.FocusEvent) => void;
}>`
  width: 100%;
  max-width: 40em;
  position: relative;
`;

const TagsInputWrapper = styled.div`
  border: 0.05em ${(props) => props.theme.accent} solid;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5em 0.7em;
  gap: 0.5em;
  border-radius: 1em;
  width: 100%;
  max-width: 50em;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLight};
  margin-bottom: 0.5rem;
`;

const TransparentInput = styled(Input)`
  border: none;
  box-shadow: none;
  margin: 0;
  outline: none;
  padding: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-wrap: nowrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.2em;
`;

const Devider = styled.div`
  width: 1px;
  background-color: ${(props) => props.theme.accentLight};
`;

const StyledAutocomplete = styled(Autocomplete)`
  position: absolute;
  z-index: 1;
`;

interface IngredientsFilterFormProps {
  ingredients: Set<string>;
  setIngredients: (ingredients: Set<string>) => void;
  handleFormSubmit: (
    e: FormEvent<HTMLFormElement>,
    inputValue: string,
    setInputValue: (value: string) => void
  ) => void;
}

function IngredientsFilterForm({
  ingredients,
  setIngredients,
  handleFormSubmit,
}: IngredientsFilterFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [autocompleteIngredients, setAutocompleteIngredients] = useState<
    string[] | []
  >([]);
  const [
    isAutocompleteIngredientsLoading,
    setIsAutocompleteIngredientsLoading,
  ] = useState(false);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  function toggleAutocomplete(e: React.FocusEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsAutocompleteOpen(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const splitted = e.target.value.split(",").map((el) => el);

    if (splitted.length > 1) {
      const filtered = splitted.filter((el) => el !== "");
      const newIngredients = new CaseInsensitiveSet([
        ...ingredients,
        ...filtered,
      ]);
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
        const autocompleteIngredients = await getIngredientsByName(
          inputValue,
          abortController.signal
        );
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

    return () => {
      abortController.abort();
    };
  }, [inputValue]);

  return (
    <Form onSubmit={handleSubmitWrapper} onBlur={(e) => toggleAutocomplete(e)}>
      <TagsInputWrapper>
        {[...ingredients].map((ingredient, i) => (
          <Ingredient
            key={ingredient}
            ingredient={ingredient}
            removeIngredient={() => removeIngredient(i)}
          />
        ))}

        <InputWrapper>
          <TransparentInput
            id="tags-input"
            type="text"
            placeholder="Lime"
            name="search"
            onChange={handleChange}
            value={inputValue}
          />
          <ButtonsWrapper>
            <ResetButton
              isDisabled={ingredients.size === 0 && inputValue === ""}
              onClick={(e) => {
                e.preventDefault();
                setIngredients(new Set(null));
                setInputValue("");
              }}
            />
            <Devider />
            <SearchButton />
          </ButtonsWrapper>
        </InputWrapper>
      </TagsInputWrapper>
      {isAutocompleteOpen && inputValue.trim().length > 0 && (
        <StyledAutocomplete
          isLoading={isAutocompleteIngredientsLoading}
          items={autocompleteIngredients}
          setItem={(item) => {
            const newIngredients = [...ingredients, item];
            setIngredients(new Set(newIngredients));
            setInputValue("");
            setIsAutocompleteOpen(false);
          }}
        />
      )}
    </Form>
  );
}

export default IngredientsFilterForm;
