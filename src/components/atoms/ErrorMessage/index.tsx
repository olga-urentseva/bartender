import styled from "styled-components";

const ErrorMessage = styled.h3`
  color: ${(props) => props.theme.error};
  margin: 0.3em 0;
  font-size: 1em;
`;
export default ErrorMessage;
