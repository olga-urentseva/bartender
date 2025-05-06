import styled, { DefaultTheme, keyframes } from "styled-components";

interface CustomTheme extends DefaultTheme {
  primaryMuted: string;
}

const loading = (theme: CustomTheme) => keyframes`
  0% {
    box-shadow: 0.75em 0 ${theme.primary}, -0.75em 0 ${theme.primaryMuted};
    background: ${theme.primaryMuted};
  }

  33% {
    box-shadow: 0.75em 0 ${theme.primaryMuted}, -0.75em 0 ${theme.primaryMuted};
    background: ${theme.primary};
  }

  66% {
    box-shadow: 0.75em 0 ${theme.primaryMuted}, -0.75em 0 ${theme.primary};
    background: ${theme.primaryMuted};
  }
`;

const AutocompleteLoader = styled.div`
  width: 0.5em;
  height: 0.5em;
  background: ${(props) => props.theme.primaryMuted};
  color: ${(props) => props.theme.primaryMuted};
  border-radius: 50%;
  box-shadow:
    0.75em 0,
    -0.75em 0;
  animation: ${(props) => loading(props.theme)} 1s infinite linear alternate;
  margin: 0.5em auto;
`;

export default AutocompleteLoader;
