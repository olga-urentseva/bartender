import styled from "styled-components";

export const Input = styled.input`
  border: 0.1em ${(props) => props.theme.accent} solid;
  border-radius: 16em;
  padding: 1em;
  width: 100%;
`;

export default Input;
