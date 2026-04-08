import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return <h3 className={styles.errorMessage}>{children}</h3>;
}
