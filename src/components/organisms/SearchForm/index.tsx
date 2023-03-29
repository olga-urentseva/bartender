import React, { FormEvent } from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 40em;
  position: relative;
  flex: 3 1 auto;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

const SearchButton = styled.button``;

type SearchFormProps = {
  title: string;
  onFormSubmit: (inputValue: string) => void;
  ingredients: string;
};

function SearchForm({ title, onFormSubmit, ingredients }: SearchFormProps) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchValue = formData.get("search");

    if (typeof searchValue !== "string") {
      return;
    }

    onFormSubmit(searchValue);
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label>{title}</Label>
      <Input
        key={ingredients}
        type="text"
        placeholder="Lime"
        name="search"
        defaultValue={ingredients}
      />
      <SearchButton type="submit">Search</SearchButton>
    </Form>
  );
}

export default SearchForm;
