import { ReactNode } from "react";
import styles from "./styles.module.css";

export default function LogoComponent({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <h2 className={`${styles.logo}${className ? ` ${className}` : ""}`}>
      {children ?? "Bart-t-tender"}
    </h2>
  );
}
