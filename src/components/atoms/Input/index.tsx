import styled from "styled-components";

export const Input = styled.input`
  border-radius: 1em;
  padding: 1em;
  width: 100%;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  color: ${(props) => props.theme.text};
  font-size: 1em;
  font-weight: 600;
  background-color: transparent;
  margin: 0.5em 0;
  text-transform: capitalize;
  border: 0.05em ${(props) => props.theme.accent} solid;

  ::placeholder {
    color: ${(props) => props.theme.accentLighter};
    font-weight: 600;
  }
`;

export default Input;
