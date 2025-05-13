import { FormEvent, useState } from "react";
import styled from "styled-components";
import Input from "../../atoms/Input";
import { SearchButton } from "../../atoms/SearchButton";
import ResetButton from "../../atoms/ResetButton";
import { useNavigation } from "react-router-dom";

type SearchCocktailsFormProps = {
  setCocktailName: (input: string) => void;
  currentName: string;
};

const SearchForm = styled.form`
  margin-bottom: 2em;
`;

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
  max-width: 40em;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.primary};
  font-weight: 500;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  top: 30%;
  right: 1em;
  display: flex;
  gap: 0.5em;
`;

const Devider = styled.div`
  width: 1px;
  background-color: ${(props) => props.theme.primaryMuted};
`;

export default function SearchCocktailsForm({
  setCocktailName,
  currentName,
}: SearchCocktailsFormProps) {
  const [inputValue, setInputValue] = useState(currentName);
  const { state } = useNavigation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (typeof inputValue !== "string" || inputValue.length === 0) {
      return;
    }
    setCocktailName(inputValue);
  }

  function handleReset(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setInputValue("");
    setCocktailName("");
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Label htmlFor="cocktails-input">
        What cocktail are you looking for?
      </Label>
      <InnerWrapper>
        <Input
          id="cocktails-input"
          type="text"
          placeholder="Name"
          name="search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={state === "loading"}
        />
        <ButtonsWrapper>
          <ResetButton onClick={handleReset} isDisabled={!inputValue} />
          <Devider />
          <SearchButton />
        </ButtonsWrapper>
      </InnerWrapper>
    </SearchForm>
  );
}
