import styled from "styled-components";

const POSSIBLE_VALUES = new Set(["alcoholic", "non-alcoholic", "all", null]);

const Wrapper = styled.div`
  display: flex;
  gap: 1.3em;
  background-color: ${(props) => props.theme.surface};
  padding: 1em 1.5em;
  border-radius: 1em;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.primaryMuted};
`;

const CheckboxInput = styled.input<{ checked: boolean | null }>`
  color: ${(props) => props.theme.primary};
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 50%;
  font-weight: 600;
  margin-right: 0.5em;
  accent-color: ${(props) => props.theme.primary};
`;

const Label = styled.label`
  color: ${(props) => props.theme.text};
  font-weight: 600;
  position: relative;
`;

const NumberOfcocktailsInfo = styled.span`
  position: absolute;
  top: -40%;
  color: ${(props) => props.theme.textMuted};
  font-size: 0.7rem;
`;

const ALCOHOLIC_FILTER_CONFIG = new Map([
  [null, "alcoholic"],
  ["alcoholic", undefined],
  ["non-alcoholic", "all"],
  ["all", "non-alcoholic"],
]);

const NON_ALCOHOLIC_FILTER_CONFIG = new Map([
  [null, "non-alcoholic"],
  ["non-alcoholic", undefined],
  ["alcoholic", "all"],
  ["all", "alcoholic"],
]);
export default function AlcoholicOrNonFilter(props: {
  setValue: (value: string | undefined) => void;
  alcoholParams: string | null;
  numberOfCocktails: { alcoholic: number; nonAlcoholic: number };
}) {
  const value = POSSIBLE_VALUES.has(props.alcoholParams)
    ? props.alcoholParams
    : null;

  function handleAlcoholicOptionChange() {
    props.setValue(ALCOHOLIC_FILTER_CONFIG.get(value));
  }

  function handleNonAlcoholicOptionChange() {
    props.setValue(NON_ALCOHOLIC_FILTER_CONFIG.get(value));
  }

  return (
    <Wrapper>
      <Label>
        <CheckboxInput
          type="checkbox"
          onChange={handleAlcoholicOptionChange}
          checked={value === "alcoholic" || value === "all"}
        />
        Alcoholic
        <NumberOfcocktailsInfo>
          {props.numberOfCocktails.alcoholic}
        </NumberOfcocktailsInfo>
      </Label>

      <Label>
        <CheckboxInput
          type="checkbox"
          onChange={handleNonAlcoholicOptionChange}
          checked={value === "non-alcoholic" || value === "all"}
        />
        Non-alcoholic
        <NumberOfcocktailsInfo>
          {props.numberOfCocktails.nonAlcoholic}
        </NumberOfcocktailsInfo>
      </Label>
    </Wrapper>
  );
}
