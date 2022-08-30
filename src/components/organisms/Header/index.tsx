import * as React from "react";
import styled, { keyframes } from "styled-components";
import { Container } from "../../atoms/Container";

const moveVertically = () => keyframes`
    0% {
    color: #aa71ef;
  }
  100% {
    color: #5685dd;
  }
`;

const HeaderComponent = styled.header`
  background-color: ${(props) => props.theme.primary};
`;

const HeaderWrapper = styled.div`
  margin: 0;
`;

const Logo = styled.h2`
  animation: ${moveVertically()} 5s linear infinite alternate both;
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
