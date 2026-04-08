import Logo from "../";
import Flower from "./Flower";
import FlowerWire from "./FlowerWire";
import styles from "./styles.module.css";

export default function SpringLogo() {
  return (
    <div className={styles.innerWrapper}>
      <FlowerWire />
      <Flower className={`${styles.flower} ${styles.flower1}`} size="1rem" color="blue" />
      <Logo />
      <Flower className={`${styles.flower} ${styles.flower2}`} size="1rem" color="pink" />
      <Flower className={`${styles.flower} ${styles.flower3}`} size="1.25rem" color="blue" />
      <Flower className={`${styles.flower} ${styles.flower4}`} size="1rem" color="pink" />
      <Flower className={`${styles.flower} ${styles.flower5}`} size="0.85rem" color="white" />
      <Flower className={`${styles.flower} ${styles.flower6}`} size="1rem" color="pink" />
      <Flower className={`${styles.flower} ${styles.flower7}`} size="0.85rem" color="white" />
      <Flower className={`${styles.flower} ${styles.flower8}`} size="0.85rem" color="white" />
    </div>
  );
}
