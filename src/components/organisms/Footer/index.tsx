import styled from "styled-components";
import { Container } from "../../atoms/Container";
import Wave from "./Wave";

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.primary};
`;

const FooterTitle = styled.h3`
  color: ${(props) => props.theme.textInversion};
  position: absolute;
  bottom: 1em;
`;

const WavyFooter = styled(Wave)`
  position: relative;
`;

const FooterContainer = styled(Container)`
  margin: 0 1em;
  padding: 0;
`;

function Footer() {
  return (
    <FooterComponent>
      <WavyFooter />
      <FooterContainer>
        <FooterTitle>Bart-t-tender</FooterTitle>
      </FooterContainer>
    </FooterComponent>
  );
}

export default Footer;
