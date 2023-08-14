import styled, { DefaultTheme, keyframes } from "styled-components";
import Container from "../../atoms/Container";
import { Link } from "react-router-dom";

interface CustomTheme extends DefaultTheme {
  accent: string;
  accentLight: string;
}

const moveVertically = (theme: CustomTheme) => keyframes`
    0% {
    color: ${theme.accent};
  }
  100% {
    color: ${theme.accentLight};
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
  flex-wrap: wrap;
  gap: 0 2em;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-left: -1rem;
  display: inline-block;
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 2em;
  padding-top: 0.6em; // pseudo-element compensation for centering
`;

const Logo = styled.h2`
  animation: ${(props) => moveVertically(props.theme)} 3s linear infinite
    alternate both;
  font-size: 2rem;
  font-family: "Oleo Script Swash Caps", serif;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
`;

const MenuLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  white-space: nowrap;

  ::after {
    content: "";
    display: block;
    height: 0.15rem;
    background: ${(props) => props.theme.text};
    transition: width 0.2s;
    width: 0;
    margin-top: 0.2rem;
  }

  &:hover,
  &:active,
  &:focus-within {
    ::after {
      width: 100%;
    }
  }
`;

export default function Header() {
  return (
    <HeaderComponent>
      <HeaderWrapper>
        <Container>
          <InnerWrapper>
            <LogoLink to="/">
              <Logo>Bart-t-tender</Logo>
            </LogoLink>
            <LinksWrapper>
              <MenuLink to="/cocktails">Cocktail Library</MenuLink>
              <MenuLink to="/about">About</MenuLink>
            </LinksWrapper>
          </InnerWrapper>
        </Container>
      </HeaderWrapper>
    </HeaderComponent>
  );
}
