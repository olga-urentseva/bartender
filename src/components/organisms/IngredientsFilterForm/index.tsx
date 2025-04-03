import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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

const FormContentWrapper = styled.div`
  display: flex;
  gap: 0.5em;
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
`;

const Combobox = styled.div`
  display: flex;
  align-items: stretch;
  border: 0.05em ${(props) => props.theme.accent} solid;
  border-radius: 1rem;
  padding: 0.5em 0.7em;
  flex: 99 1 auto;
  justify-content: space-between;
  cursor: text;
`;

const TagsInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  align-items: center;
  width: 100%;
`;

const TransparentInput = styled(Input)`
  border: none;
  box-shadow: none;
  margin: 0;
  outline: none;
  padding: 0.6rem;
  flex-basis: 3em;
  flex-grow: 1;
`;

const ButtonsWrapper = styled.div<{ isDisabled: boolean }>`
  display: ${(props) => (props.isDisabled ? "none" : "flex")};
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
  top: 100%;
  left: 0;
  width: calc(100% - 4.5em);
`;

const SubmitButtonWrapper = styled.div`
  display: flex;

  flex: none;
`;

const FormSubmitButton = styled(SearchButton)`
  background-color: ${(props) => props.theme.accentLight};
  width: 100%;
  border-radius: 1em;
  padding: 0.8em 1.2em;
  font-weight: bold;
  align-self: stretch;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.accent};
    box-shadow: 0 0.2em 0.5em -0.4em ${(props) => props.theme.accentLight};
  }
`;

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
  const [autocompleteIngredients, setAutocompleteIngredients] = useState<
    string[] | []
  >([]);
  const [
    isAutocompleteIngredientsLoading,
    setIsAutocompleteIngredientsLoading,
  ] = useState(false);
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
          abortController.signal,
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
      <FormContentWrapper>
        <Combobox onClick={() => inputRef.current?.focus()}>
          <TagsInputWrapper>
            {[...ingredients].map((ingredient, i) => (
              <Ingredient
                key={ingredient}
                ingredient={ingredient}
                removeIngredient={() => removeIngredient(i)}
              />
            ))}

            <TransparentInput
              id="tags-input"
              type="text"
              placeholder={[...ingredients].length > 0 ? "" : "Lime"}
              name="search"
              onChange={handleChange}
              value={inputValue}
              ref={inputRef}
              autoComplete="off"
            />
          </TagsInputWrapper>
          <ButtonsWrapper
            isDisabled={ingredients.size === 0 && inputValue === ""}
          >
            <Devider />
            <ResetButton
              onClick={(e) => {
                e.preventDefault();
                setIngredients(new Set(null));
                setInputValue("");
              }}
            />
          </ButtonsWrapper>
        </Combobox>

        <SubmitButtonWrapper>
          <FormSubmitButton />
        </SubmitButtonWrapper>
      </FormContentWrapper>

      {isAutocompleteOpen && inputValue.trim().length > 0 && (
        <StyledAutocomplete
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
    </Form>
  );
}

export default IngredientsFilterForm;
