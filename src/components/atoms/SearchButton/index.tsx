import styled from "styled-components";
import SearchIcon from "../SearchIcon";

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;

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
