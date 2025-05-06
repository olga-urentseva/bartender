import styled, { DefaultTheme, keyframes } from "styled-components";

interface CustomTheme extends DefaultTheme {
  primary: string;
  primaryMuted: string;
}

const loading = (theme: CustomTheme) => keyframes`
  0% {
      box-shadow: 1.5em 0 ${theme.primary}, -1.5em 0 ${theme.primaryMuted};
      background: ${theme.primaryMuted}
   }

   33% {
      box-shadow: 1.5em 0  ${theme.primaryMuted},-1.5em 0 ${theme.primaryMuted};
      background: ${theme.primary}
   }

   66% {
      box-shadow: 1.5em 0 ${theme.primaryMuted}, -1.5em 0 ${theme.primary};
      background: ${theme.primaryMuted}
   }
`;

const Loader = styled.div`
  width: 1em;
  height: 1em;
  background: ${(props) => props.theme.primaryMuted};
  color: ${(props) => props.theme.primaryMuted};
  border-radius: 50%;
  box-shadow:
    1.5em 0,
    -1.5em 0;
  animation: ${(props) => loading(props.theme)} 1s infinite linear alternate;
  margin: 5em auto;
`;

export default Loader;
