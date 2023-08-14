import { useState } from "react";
import styled from "styled-components";

enum AlcoholicOrNon {
  Alcoholic = "alcoholic",
  NonAlcoholic = "non-alcoholic",
}

const Wrapper = styled.div`
  display: flex;
  gap: 1.3em;
  background-color: ${(props) => props.theme.secondary};
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLight};
`;

const CheckboxInput = styled.input<{ checked: boolean }>`
  color: ${(props) => props.theme.accent};
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 50%;
  font-weight: 600;
  margin-right: 0.5em;
  accent-color: ${(props) => props.theme.accent};
`;

const Label = styled.label`
  color: ${(props) => props.theme.text};
  font-weight: 600;
`;

export default function AlcoholicOrNonFilter() {
  const [selectedFilter, setSelectedFilter] = useState<{
    [key in AlcoholicOrNon]: boolean;
  }>(() => ({
    [AlcoholicOrNon.Alcoholic]: false,
    [AlcoholicOrNon.NonAlcoholic]: false,
  }));

  console.log(selectedFilter);

  const handleOptionChange = (option: AlcoholicOrNon) => {
    setSelectedFilter((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  return (
    <Wrapper>
      <Label htmlFor={AlcoholicOrNon.Alcoholic}>
        <CheckboxInput
          type="checkbox"
          onChange={() => handleOptionChange(AlcoholicOrNon.Alcoholic)}
          id={AlcoholicOrNon.Alcoholic}
          checked={selectedFilter[AlcoholicOrNon.Alcoholic]}
        />
        Alcoholic
      </Label>

      <Label htmlFor={AlcoholicOrNon.NonAlcoholic}>
        <CheckboxInput
          type="checkbox"
          onChange={() => handleOptionChange(AlcoholicOrNon.NonAlcoholic)}
          id={AlcoholicOrNon.NonAlcoholic}
          checked={selectedFilter[AlcoholicOrNon.NonAlcoholic]}
        />
        Non-alcoholic
      </Label>
    </Wrapper>
  );
}
