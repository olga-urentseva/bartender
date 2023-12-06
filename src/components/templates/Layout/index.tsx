import { ReactNode } from "react";
import styled from "styled-components";
import Container from "../../atoms/Container";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

const Main = styled.main<{ type: "default" | "accent" }>`
  flex: 1 0 auto;
  background: ${(props) =>
    props.type === "default"
      ? "transparent"
      : `linear-gradient(to bottom, ${props.theme.accentPastel} 0%, transparent 80%)`};
`;

const Layout = ({
  children,
  type = "default",
}: {
  children: ReactNode;
  type?: "default" | "accent";
}) => {
  return (
    <>
      <Header type={type} />
      <Main type={type}>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
