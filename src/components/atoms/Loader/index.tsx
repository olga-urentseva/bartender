import styles from "./styles.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderDots} />
    </div>
  );
}
