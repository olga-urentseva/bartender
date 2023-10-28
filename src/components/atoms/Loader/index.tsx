import styled, { DefaultTheme, keyframes } from "styled-components";

interface CustomTheme extends DefaultTheme {
  accentLight: string;
}

const loading = (theme: CustomTheme) => keyframes`
  0% {
      box-shadow: 1.5em 0,-1.5em 0 ${theme.accentLight};
   }

   33% {
      box-shadow: 1.5em 0,-1.5em 0 ${theme.accentLight};
      background: ${theme.accentLight}
   }

   66% {
      box-shadow: 1.5em 0 ${theme.accentLight}, -1.5em 0;
      background: ${theme.accentLight}
   }
`;

const Loader = styled.div`
  width: 1em;
  height: 1em;
  background: ${(props) => props.theme.accentLight};
  color: ${(props) => props.theme.accentLight};
  border-radius: 50%;
  box-shadow: 1.5em 0, -1.5em 0;
  animation: ${(props) => loading(props.theme)} 1s infinite linear alternate;
  // compensation margins
  margin: 5em auto;
`;

export default Loader;
