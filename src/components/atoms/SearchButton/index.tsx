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
      stroke: ${({ theme }) => theme.accentPastel};
    }
  }
`;

export default function SearchButton({ ...props }) {
  return (
    <Button type="submit" aria-label="Search" title="Search" {...props}>
      <SearchIcon />
    </Button>
  );
}
