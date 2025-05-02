import styled from "styled-components";
import SearchIcon from "../SearchIcon";

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;

  ${SearchIcon} {
    stroke: ${({ theme }) => theme.accent};
  }

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;

    ${SearchIcon} {
      stroke: ${({ theme }) => theme.accentLight};
    }
  }
`;

const ButtonAccent = styled(Button)`
  background-color: ${({ theme }) => theme.accentLight};
  width: 100%;
  border-radius: 1em;
  padding: 0.8em 1.2em;
  font-weight: bold;
  align-self: stretch;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.accent};
    box-shadow: 0 0.2em 0.5em -0.4em ${(props) => props.theme.accentLight};
  }

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;

    ${SearchIcon} {
      stroke: ${({ theme }) => theme.accentPastel};
    }
  }

  ${SearchIcon} {
    stroke: ${({ theme }) => theme.accentPastel};
  }
`;

export function SearchButton({ ...props }) {
  return (
    <Button type="submit" aria-label="Search" title="Search" {...props}>
      <SearchIcon />
    </Button>
  );
}

export function SearchButtonAccent({ ...props }) {
  return (
    <ButtonAccent type="submit" aria-label="Search" title="Search" {...props}>
      <SearchIcon />
    </ButtonAccent>
  );
}
