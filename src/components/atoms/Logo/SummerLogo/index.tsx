import LogoComponent from "..";
import PalmTree from "./Palm";
import styles from "./styles.module.css";

export default function SummerLogo() {
  return (
    <div className={styles.wrapper}>
      <PalmTree />
      <LogoComponent />
      <div className={styles.sunMoon} />
    </div>
  );
}
