import styles from "./styles.module.css";

const PUMPKINS = [
  { x: 0, y: 48, width: 0.7, height: 0.5, className: styles.yellow },
  { x: 178, y: 28, width: 0.6, height: 0.75, className: styles.red },
  { x: 64, y: 0, width: 1.1, height: 1.1, className: styles.orange },
];

interface PumpkinProps {
  x: number;
  y: number;
  width: number;
  height: number;
  className: string;
}

function Pumpkin({ x, y, width, height, className }: PumpkinProps) {
  return (
    <g
      className={className}
      transform={`translate(${x} ${y}) scale(${width} ${height})`}
    >
      <ellipse className={styles.shadow} cx="50" cy="78" rx="48" ry="6" />
      <path className={styles.stem} d="M46 18 Q44 8 52 2 L57 6 Q51 10 54 18 Z" />
      <ellipse className={styles.rib} cx="28" cy="48" rx="26" ry="31" />
      <ellipse className={styles.rib} cx="72" cy="48" rx="26" ry="31" />
      <ellipse className={styles.body} cx="50" cy="48" rx="22" ry="32" />
    </g>
  );
}

export default function HalloweenPumpkins() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 96"
      aria-hidden="true"
      className={styles.pumpkins}
    >
      {PUMPKINS.map((pumpkin) => (
        <Pumpkin key={pumpkin.x} {...pumpkin} />
      ))}
    </svg>
  );
}
