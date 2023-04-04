import styled from "styled-components";
import SearchIcon from "../SearchIcon";

const Button = styled.button`
  background-color: transparent;
  border: none;

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

export default function SearchButton() {
  return (
    <Button type="submit" aria-label="Search">
      <SearchIcon />
    </Button>
  );
}
