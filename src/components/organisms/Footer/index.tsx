import styled from "styled-components";
import Container from "../../atoms/Container";
import Wave from "./Wave";
import GithubIcon from "./GithubIcon";
import { Link } from "react-router-dom";
import AboutIcon from "./AboutIcon";

const Wrapper = styled.footer``;

const InnerContainer = styled.div`
  background-color: ${(props) => props.theme.accent};
  padding-bottom: 1em;
`;

const StyledWave = styled(Wave)``;

const LinksWrapper = styled.div`
  display: flex;
  gap: 1em;
  flex-direction: column;
`;

const LinkInnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FooterGithubIcon = styled(GithubIcon)`
  stroke: ${({ theme }) => theme.textInversion};
`;

const FooterAboutIcon = styled(AboutIcon)`
  stroke: ${({ theme }) => theme.textInversion};
`;

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.textInversion};
  font-weight: 600;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus-within {
    color: ${(props) => props.theme.accentExplicit};

    ${FooterGithubIcon}, ${FooterAboutIcon} {
      stroke: ${({ theme }) => theme.accentExplicit};
    }
  }
`;

const HomePageLink = styled(Link)`
  color: ${(props) => props.theme.textInversion};
  bottom: 1em;
  font-weight: 600;
  font-size: 1.5em;
  margin: 0;
  text-decoration: none;
  font-family: "Oleo Script Swash Caps", serif;

  &:hover,
  &:active,
  &:focus-within {
    color: ${(props) => props.theme.accentExplicit};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <StyledWave />
      <InnerContainer>
        <Container>
          <LinksWrapper>
            <HomePageLink to="/">Bart-t-tender</HomePageLink>
            <FooterLink to="/about">
              <LinkInnerWrapper>
                <FooterAboutIcon />
                About
              </LinkInnerWrapper>
            </FooterLink>
            <FooterLink to="https://github.com/olga-urentseva" target="_blank">
              <LinkInnerWrapper>
                <FooterGithubIcon />
                GitHub
              </LinkInnerWrapper>
            </FooterLink>
          </LinksWrapper>
        </Container>
      </InnerContainer>
    </Wrapper>
  );
}

export default Footer;
