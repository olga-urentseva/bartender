import { FormEvent } from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";
import SearchIcon from "./SearchIcon";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 40em;
  position: relative;
  flex: 3 1 auto;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 0;
  top: 30%;
  padding: 0 1em;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;

    ${SearchIcon} {
      stroke: ${({ theme }) => theme.accentLighter};
    }
  }
`;

type SearchFormProps = {
  title: string;
  onFormSubmit: (inputValue: string) => void;
  items: string;
};

function SearchForm({ title, onFormSubmit, items }: SearchFormProps) {
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
      <InnerWrapper>
        <Input
          key={items}
          type="text"
          placeholder="Lime"
          name="search"
          defaultValue={items}
        />
        <SearchButton type="submit" aria-label="Search">
          <SearchIcon color={""} />
        </SearchButton>
      </InnerWrapper>
    </Form>
  );
}

export default SearchForm;
