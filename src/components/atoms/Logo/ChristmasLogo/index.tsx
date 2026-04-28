import { PropsWithChildren } from "react";
import Logo from "../index";
import GarlandWire from "./GarlandWire";
import styles from "./styles.module.css";

export default function ChristmasLogo({ children }: PropsWithChildren) {
  return (
    <div className={styles.innerWrapper}>
      <GarlandWire />
      <div className={`${styles.lamp} ${styles.lamp1}`} />
      <div className={`${styles.lamp} ${styles.lamp2}`} />
      <Logo className={styles.originalLogo}>{children}</Logo>
      <div className={`${styles.lamp} ${styles.lamp3}`} />
      <div className={`${styles.lamp} ${styles.lamp4}`} />
      <div className={`${styles.lamp} ${styles.lamp5}`} />
      <div className={`${styles.lamp} ${styles.lamp6}`} />
      <div className={`${styles.lamp} ${styles.lamp7}`} />
      <div className={`${styles.lamp} ${styles.lamp8}`} />
    </div>
  );
}
