import { ReactNode } from "react";
import Container from "../../atoms/Container";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";
import styles from "./styles.module.css";

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
      <main className={type === "accent" ? styles.mainAccent : styles.main}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
