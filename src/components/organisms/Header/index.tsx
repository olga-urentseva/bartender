import styled from "styled-components";
import Container from "../../atoms/Container";
import { Link } from "react-router-dom";

import SpringLogo from "../../atoms/Logo/SpringLogo.tsx";
import { keyframes } from "styled-components";

interface HeaderProps {
  type: "default" | "accent";
}

const HeaderComponent = styled.header<HeaderProps>`
  padding: 2em 0;
  background-color: ${(props) =>
    props.type === "default"
      ? props.theme.background
      : props.theme.backgroundMuted};
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
    height: 2px;
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

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BarLink = styled(MenuLink)`
  position: relative;
  transition: color 0.3s ease;

  &:hover,
  &:active,
  &:focus-within {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(
      90deg,
      #ff8a00,
      #e52e71,
      #7b68ee,
      #00bfff
    );
    background-size: 300% 100%;
    animation: ${gradientShift} 3s ease infinite;
    text-shadow: none;

    &::after {
      width: 100%;
      background: linear-gradient(90deg, #ff8a00, #e52e71, #7b68ee, #00bfff);
      background-size: 300% 100%;
      animation: ${gradientShift} 3s ease infinite;
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
              <SpringLogo />
            </LogoLink>
            <LinksWrapper>
              <BarLink to="/">✨ What’s in Your Bar? ✨</BarLink>
              <MenuLink to="/cocktails">Cocktails Library</MenuLink>
              <MenuLink to="/collections">Collections</MenuLink>
              <MenuLink to="/about">About</MenuLink>
            </LinksWrapper>
          </InnerWrapper>
        </Container>
      </HeaderWrapper>
    </HeaderComponent>
  );
}
