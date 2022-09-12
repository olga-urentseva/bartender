import React, { ReactElement } from "react";
import styled from "styled-components";
import { Container } from "../../atoms/Container";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

const Main = styled.main`
  flex: 1 0 auto;
  background-color: ${(props) => props.theme.primary};
`;

const Layout = ({
  children,
}: {
  children: ReactElement | string | ReactElement[];
}) => {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
