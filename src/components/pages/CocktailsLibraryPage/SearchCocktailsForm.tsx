import { FormEvent } from "react";
import styled from "styled-components";
import Input from "../../atoms/Input";
import SearchButton from "../../atoms/SearchButton";

type SearchCocktailsFormProps = {
  setCocktailName: (input: string) => void;
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
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 30%;
  right: 1em;
`;

export default function SearchCocktailsForm({
  setCocktailName,
}: SearchCocktailsFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputValue = formData.get("search") || null;

    if (typeof inputValue !== "string") {
      return;
    }

    setCocktailName(inputValue);
  }

  return (
    <SearchForm onSubmit={handleSubmit}>
      <Label>What cocktail are you looking for?</Label>
      <InnerWrapper>
        <Input type="text" placeholder="Lime" name="search" />
        <ButtonWrapper>
          <SearchButton />
        </ButtonWrapper>
      </InnerWrapper>
    </SearchForm>
  );
}
