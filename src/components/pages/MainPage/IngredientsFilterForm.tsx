import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";
import Ingredient from "../../atoms/SearchIngredient";
import SearchButton from "../../atoms/SearchButton";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";

const Form = styled.form`
  width: 100%;
  max-width: 40em;
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
  margin-top: 0.5em;
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

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

interface IngredientsFilterFormProps {
  ingredients: Set<string>;
  setIngredients: (ingredients: Set<string>) => void;
}

function IngredientsFilterForm({
  ingredients,
  setIngredients,
}: IngredientsFilterFormProps) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (inputValue === "") {
      return;
    }

    const newIngredients = new CaseInsensitiveSet(ingredients);
    newIngredients.add(inputValue);

    setIngredients(newIngredients);
    setInputValue("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const splitted = e.target.value.split(",").map((el) => el.trim());

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

  return (
    <Form onSubmit={handleSubmit}>
      <Label>What do you have in your bar?</Label>
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
            type="text"
            placeholder="Lime"
            name="search"
            onChange={handleChange}
            value={inputValue}
          />
          <SearchButton />
        </InputWrapper>
      </TagsInputWrapper>
    </Form>
  );
}

export default IngredientsFilterForm;
