import styled from "styled-components";
import Container from "../../atoms/Container";
import { Link } from "react-router-dom";

import ChristmasLogo from "../../atoms/ChristmasLogo";
import Logo from "../../atoms/Logo";

interface HeaderProps {
  type: "default" | "accent";
}

const HeaderComponent = styled.header<HeaderProps>`
  padding: 2em 0;
  background-color: ${(props) =>
    props.type === "default" ? "transparent" : props.theme.accentPastel};
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

export default function Header({ type, ...otherProps }: HeaderProps) {
  return (
    <HeaderComponent type={type} {...otherProps}>
      <HeaderWrapper>
        <Container>
          <InnerWrapper>
            <LogoLink to="/">
              <ChristmasLogo>Bart-t-tender</ChristmasLogo>
            </LogoLink>
            <LinksWrapper>
              <MenuLink to="/cocktails">Cocktail Library</MenuLink>
              <MenuLink to="/collections">Collections</MenuLink>
              <MenuLink to="/about">About</MenuLink>
            </LinksWrapper>
          </InnerWrapper>
        </Container>
      </HeaderWrapper>
    </HeaderComponent>
  );
}
