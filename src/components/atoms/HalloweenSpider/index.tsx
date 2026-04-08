import { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import styles from "./styles.module.css";

import clickAudio from "./click-audio.wav";
import heartsAudio from "./hearts-audio.wav";
import swishAudio from "./swish-audio.mp3";

const spiderColors = ["#222", "#4169E1", "#1E90FF", "#00BFFF", "#87CEEB", "#ADD8E6"];
const legColors = ["#333", "#2E4BC6", "#1873CC", "#0099CC", "#6BB1D4", "#8BC2D1"];

const getSpiderColor = (clickCount: number) => spiderColors[clickCount] ?? "#222";
const getLegColor = (clickCount: number) => legColors[clickCount] ?? "#333";

const audioClick = new Audio(clickAudio);
const audioHearts = new Audio(heartsAudio);
audioHearts.volume = 0.5;
const audioSwish = new Audio(swishAudio);

const legLeftClasses = [styles.legLeft0, styles.legLeft1, styles.legLeft2];
const legRightClasses = [styles.legRight0, styles.legRight1, styles.legRight2];

function HalloweenSpider() {
  const [isSpiderOnTheRight, changeSpiderPlacement] = useLocalStorage("isSpiderOnTheRight", true);
  const [clickCount, setClickCount] = useLocalStorage("clickCount", 0);
  const [showHearts, setShowHearts] = useState(false);
  const [areHeartsFalling, setAreHeartsFalling] = useState(false);
  const [heartPositions, setHeartPositions] = useState<number[]>([]);

  function escape() {
    if (areHeartsFalling) return;
    audioSwish.play();
    changeSpiderPlacement(!isSpiderOnTheRight);
  }

  const handleClick = () => {
    if (!areHeartsFalling) {
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);
      audioClick.play();

      if (newClickCount === 5) {
        audioHearts.play();
        setAreHeartsFalling(true);
        setHeartPositions(Array.from({ length: 5 }, () => (Math.random() - 0.5) * 120));
        setShowHearts(true);
        setTimeout(() => {
          setShowHearts(false);
          setAreHeartsFalling(false);
          setClickCount(0);
        }, 5000);
      }
    }
  };

  const spiderLeft = isSpiderOnTheRight
    ? "clamp(70%, 85%, calc(100vw - 10rem))"
    : "10%";

  return (
    <div className={styles.spiderWrapper} style={{ left: spiderLeft }}>
      <div className={styles.spiderweb} />
      <div
        className={styles.spiderBody}
        style={{ background: getSpiderColor(clickCount) }}
        onClick={handleClick}
      >
        <div className={`${styles.eye} ${styles.eyeLeft}`} />
        <div className={styles.eye} />
      </div>
      {showHearts &&
        heartPositions.map((spreadX, index) => (
          <div
            key={index}
            className={styles.heart}
            style={
              {
                animationDelay: `${index * 200}ms`,
                "--spread-x": `${spreadX / 16}rem`,
              } as React.CSSProperties
            }
          />
        ))}
      <div
        className={`${styles.legsContainer} ${styles.legsContainerLeft}`}
        onClick={escape}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={`left-${index}`}
            className={`${styles.leg} ${legLeftClasses[index]}`}
            style={{ borderTopColor: getLegColor(clickCount) }}
          />
        ))}
      </div>
      <div className={styles.legsContainer} onClick={escape}>
        {[0, 1, 2].map((index) => (
          <div
            key={`right-${index}`}
            className={`${styles.leg} ${legRightClasses[index]}`}
            style={{ borderTopColor: getLegColor(clickCount) }}
          />
        ))}
      </div>
    </div>
  );
}

export default HalloweenSpider;
