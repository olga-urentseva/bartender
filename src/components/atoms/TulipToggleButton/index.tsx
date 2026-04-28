import "ios-vibrator-pro-max";
import styles from "./styles.module.css";

import soundUrl from "./sound.wav";

interface Props {
  isSpring: boolean;
  onClick: () => void;
}

const sound = new Audio(soundUrl);

export function TulipToggleButton({ isSpring, onClick }: Props) {
  return (
    <button
      className={styles.wrapper}
      onClick={() => {
        sound.currentTime = 0;
        sound.play();
        navigator.vibrate(100);
        onClick();
      }}
      title={isSpring ? "Switch to Default theme" : "Switch to Spring theme"}
    >
      <div className={styles.shadow} />
      <svg
        className={styles.tulipSvg}
        width="52"
        height="60"
        viewBox="0 0 36 52"
      >
        {/* Stem */}
        <g className={styles.stem}>
          <path
            className={styles.stemLine}
            d="M18 50 Q17 38 18 28"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaf left */}
          <path
            className={`${styles.leaf} ${styles.leafLeft}`}
            d="M17.5 40 Q10 36 9 30 Q14 33 17.5 38Z"
          />
          {/* Leaf right */}
          <path
            className={`${styles.leaf} ${styles.leafRight}`}
            d="M18.5 40 Q26 36 27 30 Q22 33 18.5 38Z"
          />
        </g>

        {/* Petals */}
        <g className={styles.petals}>
          {/* Center petal */}
          <ellipse className={styles.petal} cx="18" cy="17" rx="5" ry="9" />
          {/* Left petal */}
          <ellipse
            className={styles.petal}
            cx="15"
            cy="19"
            rx="4.5"
            ry="8"
            transform="rotate(-18 12 24)"
          />
          {/* Right petal */}
          <ellipse
            className={styles.petal}
            cx="21"
            cy="19"
            rx="4.5"
            ry="8"
            transform="rotate(18 24 24)"
          />
          {/* Inner shading */}
          <ellipse
            className={styles.petalDark}
            cx="18"
            cy="19"
            rx="3"
            ry="5.5"
            opacity="0.35"
          />
        </g>
      </svg>
    </button>
  );
}
