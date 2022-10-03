import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  fill: ${(props) => props.theme.accentLighter};
`;

function SearchIcon() {
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
    <path d="M13 3a10 10 0 1 0 6 18l6 6a1 1 0 1 0 2-2l-6-6 2-6c0-6-4-10-10-10zm0 2a8 8 0 1 1 0 16 8 8 0 1 1 0-16z" />
  </Svg>;
}

export default SearchIcon;
