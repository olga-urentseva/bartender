import { useState } from "react";
import styled from "styled-components";

export enum AlcoholicOrNon {
  Alcoholic = "alcoholic",
  NonAlcoholic = "non-alcoholic",
}

export type AlcoholFilterValues = "alcoholic" | "nonAlcoholic" | "default";

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

export default function AlcoholicOrNonFilter(props: {
  setValue: (value: AlcoholFilterValues) => void;
  initialState: boolean | null;
}) {
  const [selectedFilter, setSelectedFilter] = useState<{
    [key in AlcoholicOrNon]: boolean;
  }>(() => {
    return {
      [AlcoholicOrNon.Alcoholic]: props.initialState === true ?? false,
      [AlcoholicOrNon.NonAlcoholic]: props.initialState === false ?? false,
    };
  });

  const handleOptionChange = (option: AlcoholicOrNon) => {
    setSelectedFilter((prevState) => {
      const updatedState = {
        ...prevState,
        [option]: !prevState[option],
      };
      if (updatedState.alcoholic && !updatedState["non-alcoholic"]) {
        props.setValue("alcoholic");
      }
      if (!updatedState.alcoholic && updatedState["non-alcoholic"]) {
        props.setValue("nonAlcoholic");
      }
      if (
        (!updatedState.alcoholic && !updatedState["non-alcoholic"]) ||
        (updatedState.alcoholic && updatedState["non-alcoholic"])
      ) {
        props.setValue("default");
      }

      return updatedState;
    });
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
