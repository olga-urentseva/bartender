import React from "react";
import styled from "styled-components";

import Input from "../../atoms/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 40em;
  position: relative;
`;

const Label = styled.label`
  font-size: 1.5em;
  color: ${(props) => props.theme.accent};
  font-weight: 500;
`;

type SearchFormProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

function SearchForm({ inputValue, setInputValue }: SearchFormProps) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Label>What do you have in your bar?</Label>
      <Input
        type="text"
        placeholder="Lime"
        value={inputValue}
        onChange={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
        }}
      />
    </Form>
  );
}

export default SearchForm;
