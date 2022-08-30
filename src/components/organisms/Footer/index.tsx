import styled from "styled-components";
import { Container } from "../../atoms/Container";

const FooterComponent = styled.footer`
  -webkit-box-shadow: 0 -0.4em 1.5em -0.8em ${(props) => props.theme.accent};
  -moz-box-shadow: 0 -0.4em 1.5em -0.8em ${(props) => props.theme.accent};
  box-shadow: 0 -0.4em 1.5em -0.8em ${(props) => props.theme.accent};
`;

const FooterTitle = styled.h3`
  color: ${(props) => props.theme.textLighter};
  margin: 0;
`;

function Footer() {
  return (
    <FooterComponent>
      <Container>
        <FooterTitle>Bart-t-tender</FooterTitle>
      </Container>
    </FooterComponent>
  );
}

export default Footer;