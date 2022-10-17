import React from "react";
import styled from "styled-components";
import Container from "../../atoms/Container";
import Wave from "./Wave";

const Wrapper = styled.footer``;

const InnerWrapper = styled.div`
  background-color: ${(props) => props.theme.accent};
  padding-bottom: 1em;
`;

const StyledWave = styled(Wave)``;

const FooterTitle = styled.h3`
  color: ${(props) => props.theme.textInversion};
  bottom: 1em;
  font-weight: 400;
  font-size: 1.2em;
  margin: 0;
`;

function Footer() {
  return (
    <Wrapper>
      <StyledWave />
      <InnerWrapper>
        <Container>
          <FooterTitle>Bart-t-tender</FooterTitle>
        </Container>
      </InnerWrapper>
    </Wrapper>
  );
}

export default Footer;
