import Container from "../../atoms/Container";
import Wave from "./Wave";
import GithubIcon from "./GithubIcon";
import { Link } from "react-router-dom";
import AboutIcon from "./AboutIcon";
import ThemeSwitcher from "./ThemeSwitcher";
import styles from "./styles.module.css";

function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Wave />
      <div className={styles.innerContainer}>
        <Container>
          <div className={styles.linksWrapper}>
            <Link to="/" className={styles.homePageLink}>
              Bart-t-tender
            </Link>
            <Link to="/about" className={styles.footerLink}>
              <div className={styles.linkInnerWrapper}>
                <AboutIcon className={styles.footerIcon} />
                About
              </div>
            </Link>
            <Link
              to="https://github.com/olga-urentseva"
              target="_blank"
              className={styles.footerLink}
            >
              <div className={styles.linkInnerWrapper}>
                <GithubIcon className={styles.footerIcon} />
                GitHub
              </div>
            </Link>
          </div>
          <ThemeSwitcher />
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
