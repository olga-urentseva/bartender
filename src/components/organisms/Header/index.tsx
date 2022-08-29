import * as React from "react";
import styled from "styled-components";
import { Container } from "../../atoms/Container";

const HeaderComponent = styled.header``;

export default function Header() {
  return (
    <HeaderComponent>
      <Container>
        <h3>Bart-t-tender</h3>
      </Container>
    </HeaderComponent>
  );
}
