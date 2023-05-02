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

const LinkInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  display: flex;
  flex-direction: column;

  ::after {
    margin-top: 0.3rem;
  }
`;

const HomePageLink = styled(Link)`
  color: ${(props) => props.theme.textInversion};
  font-weight: 600;
  font-size: 1.5rem;
  text-decoration: none;
  font-family: "Oleo Script Swash Caps", serif;
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: flex-start;

  ${HomePageLink}, ${FooterLink} {
    ::after {
      content: "";
      display: block;
      height: 0.15rem;
      background: ${(props) => props.theme.textInversion};
      transition: width 0.2s;
      width: 0;
      box-shadow: 0.01rem 0.1rem 1.5rem -0.1rem ${(props) => props.theme.textInversion};
    }

    &:hover,
    &:active,
    &:focus-within {
      ::after {
        width: 100%;
      }
    }
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
