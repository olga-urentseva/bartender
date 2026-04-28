import styles from "./styles.module.css";

const SNOWFLAKES_NUMBER = 50;

function Snowfall() {
  return (
    <div className={styles.innerWrapper}>
      {Array.from({ length: SNOWFLAKES_NUMBER }).map((_, index) => {
        const shouldStartOnScreen = Math.random() > 0.3;
        const startPosition = shouldStartOnScreen ? Math.random() * 100 : -5;

        return (
          <div
            key={index}
            className={styles.snowFlake}
            style={
              {
                "--left": `${Math.random() * 100}%`,
                "--duration": `${Math.random() * 3 + 7}s`,
                "--delay": `${Math.random() * 5}s`,
                "--start-position": `${startPosition}vh`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export default Snowfall;
