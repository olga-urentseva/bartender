import styled, { DefaultTheme, keyframes } from "styled-components";

const loading = (theme: DefaultTheme) => keyframes`
  0% {
      box-shadow: 1.5em 0,-1.5em 0 ${theme.accent};
   }

   33% {
      box-shadow: 1.5em 0,-1.5em 0 ${theme.accent};
      background: ${theme.accent}
   }

   66% {
      box-shadow: 1.5em 0 ${theme.accent}, -1.5em 0;
      background: ${theme.accent}
   }
`;

const Loader = styled.div`
  width: 1em;
  height: 1em;
  background: ${(props) => props.theme.accentLighter};
  color: ${(props) => props.theme.accentLighter};
  border-radius: 50%;
  box-shadow: 1.5em 0, -1.5em 0;
  animation: ${(props) => loading(props.theme)} 1s infinite linear alternate;
  // compensation margins
  margin: 5em auto;
`;

export default Loader;
