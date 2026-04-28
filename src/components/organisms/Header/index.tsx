import Container from "../../atoms/Container";
import { Link } from "react-router-dom";
import SpringLogo from "../../atoms/Logo/SpringLogo.tsx";
import styles from "./styles.module.css";

interface HeaderProps {
  type: "default" | "accent";
}

export default function Header({ type, ...otherProps }: HeaderProps) {
  return (
    <header
      className={type === "accent" ? styles.headerAccent : styles.header}
      {...otherProps}
    >
      <div className={styles.headerWrapper}>
        <Container>
          <div className={styles.innerWrapper}>
            <Link to="/" className={styles.logoLink}>
              <SpringLogo />
            </Link>
            <div className={styles.linksWrapper}>
              <Link to="/" className={styles.barLink}>
                🍹 What&apos;s in Your Bar? 🍹
              </Link>
              <Link to="/cocktails" className={styles.menuLink}>
                Cocktails Library
              </Link>
              <Link to="/collections" className={styles.menuLink}>
                Collections
              </Link>
              <Link to="/about" className={styles.menuLink}>
                About
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
