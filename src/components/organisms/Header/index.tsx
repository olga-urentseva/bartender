import React from "react";
import styled, { DefaultTheme, keyframes } from "styled-components";
import Container from "../../atoms/Container";
import { Link } from "react-router-dom";

const moveVertically = (theme: DefaultTheme) => keyframes`
    0% {
    color: ${theme.accent};
  }
  100% {
    color: ${theme.accentLighter};
  }
`;

const HeaderComponent = styled.header`
  padding: 2em 0;
`;

const HeaderWrapper = styled.div`
  margin: 0;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  padding: 1em;
  margin-left: -1em;
  display: inline-block;
`;

const Logo = styled.h2`
  animation: ${(props) => moveVertically(props.theme)} 5s linear infinite
    alternate both;
  font-size: 2em;
  font-family: "Oleo Script Swash Caps", serif;
  margin: 0;
  display: inline-block;
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  display: inline-block;

  &:hover,
  &:active,
  &:focus-within {
    color: ${(props) => props.theme.textLighter};
  }
`;

export default function Header() {
  return (
    <HeaderComponent>
      <HeaderWrapper>
        <Container>
          <InnerWrapper>
            <LogoLink to={"/"}>
              <Logo>Bart-t-tender</Logo>
            </LogoLink>
            <MenuLink to={"/cocktails"}>Cocktail Library</MenuLink>
          </InnerWrapper>
        </Container>
      </HeaderWrapper>
    </HeaderComponent>
  );
}
