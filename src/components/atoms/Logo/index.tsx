import styled from "styled-components";

const Logo = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: 2rem;
  font-family: "Oleo Script Swash Caps", serif;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
`;

export default Logo;
