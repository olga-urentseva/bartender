import React from "react";
import styled from "styled-components";
import { Container } from "../../atoms/Container";
import Wave from "./Wave";

const FooterComponent = styled.footer`
  background-color: ${(props) => props.theme.primary};
  position: relative;
`;

const FooterContainer = styled(Container)`
  margin: 0 auto;
  padding: 0;
`;

const WavyFooter = styled(Wave)``;

const FooterTitle = styled.h3`
  color: ${(props) => props.theme.textInversion};
  position: absolute;
  bottom: 1em;
  font-weight: 400;
  font-size: 1.2em;
  margin: 1em;
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
