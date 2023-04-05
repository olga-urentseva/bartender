import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";
import Ingredient from "../../atoms/SearchIngredient";
import { CaseInsensitiveSet } from "../../../lib/case-insensetive-set";
import SearchButton from "../../atoms/SearchButton";

const IngredientsWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  flex: 2 1 20em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 2em;
  flex: 3 1 auto;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40em;
  flex: 3 1 auto;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 30%;
  right: 1em;
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
      <SearchBarWrapper>
        <Label>What do you have in your bar?</Label>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Lime"
            name="search"
            onChange={handleChange}
            value={inputValue}
          />
          <ButtonWrapper>
            <SearchButton />
          </ButtonWrapper>
        </InputWrapper>
      </SearchBarWrapper>
      <IngredientsWrapper>
        {[...ingredients].map((ingredient, i) => (
          <Ingredient
            key={ingredient}
            ingredient={ingredient}
            removeIngredient={() => removeIngredient(i)}
          />
        ))}
      </IngredientsWrapper>
    </Form>
  );
}

export default IngredientsFilterForm;
