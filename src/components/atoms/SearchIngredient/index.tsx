import styled from "styled-components";

const DeleteButton = styled.button`
  background-color: ${(props) => props.theme.textInversion};
  border: 0.1em solid transparent;
  border-radius: 50%;
  color: ${(props) => props.theme.accent};
  font-size: 1em;
  padding: 0.05em 0.35em;
  box-shadow: 0.01em 0.1em 1.5em -0.1em #99a8de;
  cursor: pointer;
  display: block;
  position: absolute;
  left: 100%;
  transform: translate(-50%, -50%);
  top: 0;

  clip-path: inset(50%);
`;

const IngredientItom = styled.div`
  color: ${(props) => props.theme.textInversion};
  background-color: ${(props) => props.theme.accent};
  padding: 0.25em 1em;
  border-radius: 0.5em;
  position: relative;
  transition: background-color 0.2s;

  &:hover,
  &:active,
  &:focus-within {
    background-color: ${(props) => props.theme.accentLighter};

    ${DeleteButton} {
      clip-path: none;
    }
  }
`;

function Ingredient({
  ingredient,
  removeIngredient,
}: {
  ingredient: string;
  removeIngredient: ({ ingredient }: { ingredient: string }) => void;
}) {
  return (
    <IngredientItom>
      {ingredient}
      <DeleteButton
        title="Delete ingredient"
        onClick={() => removeIngredient({ ingredient })}
      >
        ×
      </DeleteButton>
    </IngredientItom>
  );
}

export default Ingredient;
