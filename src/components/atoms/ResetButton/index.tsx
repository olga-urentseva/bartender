import { FormEvent } from "react";
import styled from "styled-components";

const ResetIcon = styled.svg`
  fill: ${({ theme }) => theme.accent};
`;

const Button = styled.button<{ isDisabled?: boolean }>`
  background-color: transparent;
  border: none;
  padding: 0;
  display: ${({ isDisabled }) => (isDisabled ? "none" : "inline")};

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;

    ${ResetIcon} {
      fill: ${({ theme }) => theme.accentLight};
    }
  }
`;

export default function ResetButton({
  onClick,
  isDisabled,
}: {
  onClick: (e: FormEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}) {
  return (
    <Button
      type="reset"
      aria-label="Reset"
      onClick={onClick}
      title="Reset"
      isDisabled={isDisabled}
    >
      <ResetIcon
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 50 50"
      >
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </ResetIcon>
    </Button>
  );
}
