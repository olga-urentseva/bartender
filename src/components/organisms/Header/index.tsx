import * as React from "react";
import styled, { DefaultTheme, keyframes } from "styled-components";
import { Container } from "../../atoms/Container";

const moveVertically = (theme: DefaultTheme) => keyframes`
    0% {
    color: ${theme.accent};
  }
  100% {
    color: ${theme.accentLighter};
  }
`;

const HeaderComponent = styled.header`
  background-color: ${(props) => props.theme.primary};
`;

const HeaderWrapper = styled.div`
  margin: 0;
`;

const Logo = styled.h2`
  animation: ${(props) => moveVertically(props.theme)} 5s linear infinite
    alternate both;
  /* color: ${(props) => props.theme.text}; */
  font-size: 2em;
  font-family: "Oleo Script Swash Caps";
  margin: 0;
`;

export default function Header() {
  return (
    <HeaderComponent>
      <HeaderWrapper>
        <Container>
          <Logo>Bart-t-tender</Logo>
        </Container>
      </HeaderWrapper>
    </HeaderComponent>
  );
}
