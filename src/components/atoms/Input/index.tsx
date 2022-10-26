import styled, { DefaultTheme, keyframes } from "styled-components";

const moveVertically = (theme: DefaultTheme) => keyframes`
    0% {
    border: 0.05em ${theme.accent} solid;
  }
  100% {
    border: 0.05em ${theme.accentLighter} solid;
  }
`;

export const Input = styled.input`
  animation: ${(props) => moveVertically(props.theme)} 5s linear infinite
    alternate both;
  border-radius: 1em;
  padding: 1em;
  width: 100%;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  color: ${(props) => props.theme.text};
  font-size: 1em;
  font-weight: 600;
  background-color: transparent;
  margin: 0.5em 0;

  ::placeholder {
    color: ${(props) => props.theme.accentLighter};
    font-weight: 600;
  }
`;

export default Input;
