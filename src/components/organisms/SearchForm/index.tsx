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
  title: string;
};

function SearchForm({ inputValue, setInputValue, title }: SearchFormProps) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Label>{title}</Label>
      <Input
        type="text"
        placeholder="Lime"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value.toUpperCase());
        }}
      />
    </Form>
  );
}

export default SearchForm;
