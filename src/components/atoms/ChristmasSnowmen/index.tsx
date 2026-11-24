import { ReactNode } from "react";
import styles from "./styles.module.css";

const HEART_BUTTON =
  "M0 1.8 C-2.4 0 -2.4 -2.4 -1 -2.4 C-0.4 -2.4 0 -1.8 0 -1.4 C0 -1.8 0.4 -2.4 1 -2.4 C2.4 -2.4 2.4 0 0 1.8 Z";

interface SnowmanProps {
  transform: string;
  className: string;
  children: ReactNode;
}

function Snowman({ transform, className, children }: SnowmanProps) {
  return (
    <g className={className} transform={transform}>
      <line className={styles.arm} x1="40" y1="58" x2="24" y2="46" />
      <line className={styles.arm} x1="64" y1="58" x2="80" y2="50" />
      <circle className={styles.snow} cx="50" cy="80" r="20" />
      <circle className={styles.snow} cx="52" cy="57" r="14" />
      <circle className={styles.snow} cx="56" cy="36" r="11" />
      <circle className={styles.drop} cx="33" cy="93" r="2" />
      <circle
        className={`${styles.drop} ${styles.lateDrop}`}
        cx="67"
        cy="93"
        r="2"
      />
      <path className={styles.closedEye} d="M57 33 q2 2 4 0" />
      <path className={styles.nose} d="M66 37 L77 38.5 L66 40 Z" />
      <path
        className={styles.scarf}
        d="M44 46 Q56 52 66 45 L66 49 Q56 56 44 50 Z"
      />
      <rect
        className={styles.scarf}
        x="44"
        y="48"
        width="5"
        height="12"
        rx="2"
      />
      {children}
    </g>
  );
}

export default function ChristmasSnowmen() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 110"
      aria-hidden="true"
      className={styles.snowmen}
    >
      <ellipse className={styles.puddle} cx="100" cy="101" rx="82" ry="6" />
      <path
        className={styles.heart}
        d="M100 16 C92 10 92 2 97 2 C99 2 100 4 100 5 C100 4 101 2 103 2 C108 2 108 10 100 16 Z"
      />
      <Snowman
        transform="translate(7 1) rotate(15 50 100)"
        className={styles.man}
      >
        <rect
          className={styles.hat}
          x="49"
          y="10"
          width="14"
          height="15"
          rx="1"
        />
        <rect className={styles.hatBand} x="49" y="21" width="14" height="3" />
        <rect
          className={styles.hat}
          x="44"
          y="24"
          width="24"
          height="3"
          rx="1"
        />
        <path className={styles.brow} d="M56 30 l5 -1" />
        <circle className={styles.coal} cx="54" cy="55" r="1.6" />
        <circle className={styles.coal} cx="54" cy="62" r="1.6" />
        <circle className={styles.coal} cx="51" cy="77" r="1.8" />
      </Snowman>
      <Snowman
        transform="translate(176 11) scale(-0.9 0.9) rotate(6 50 100)"
        className={styles.woman}
      >
        <path className={styles.hat} d="M45 32 Q46 20 57 20 Q67 21 67 30 Z" />
        <circle className={styles.hat} cx="56" cy="18" r="3.5" />
        <path
          className={styles.lashes}
          d="M58 34.5 l-1 2 M60 35 l0 2 M62 34.5 l1 2"
        />
        <circle className={styles.cheek} cx="62" cy="40" r="2.5" />
        <path
          className={styles.heartButton}
          d={HEART_BUTTON}
          transform="translate(54 55)"
        />
        <path
          className={styles.heartButton}
          d={HEART_BUTTON}
          transform="translate(54 62)"
        />
      </Snowman>
    </svg>
  );
}
