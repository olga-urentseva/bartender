import styled, { DefaultTheme, keyframes } from "styled-components";

interface CustomTheme extends DefaultTheme {
  accentLight: string;
}

const loading = (theme: CustomTheme) => keyframes`
  0% {
    box-shadow: 0.75em 0 ${theme.accent}, -0.75em 0 ${theme.accentLight}; 
    background: ${theme.accentLight};
  }

  33% {
    box-shadow: 0.75em 0 ${theme.accentLight}, -0.75em 0 ${theme.accentLight}; 
    background: ${theme.accent};
  }

  66% {
    box-shadow: 0.75em 0 ${theme.accentLight}, -0.75em 0 ${theme.accent}; 
    background: ${theme.accentLight};
  }
`;

const AutocompleteLoader = styled.div`
  width: 0.5em;
  height: 0.5em;
  background: ${(props) => props.theme.accentLight};
  color: ${(props) => props.theme.accentLight};
  border-radius: 50%;
  box-shadow: 0.75em 0, -0.75em 0;
  animation: ${(props) => loading(props.theme)} 1s infinite linear alternate;
  margin: 0.5em auto;
`;

export default AutocompleteLoader;
