import styles from "./flower.module.css";

type Colors = "pink" | "blue" | "white";
type FlowerSize = "0.85rem" | "1rem" | "1.15rem" | "1.25rem";

const flowerColors: Record<Colors, { petal: string; miolo: string }> = {
  pink: { petal: "#f6b4e0", miolo: "#ffffff" },
  blue: { petal: "#9fbfe4", miolo: "#ffffff" },
  white: { petal: "#fff780", miolo: "#ffffff" },
};

interface FlowerProps {
  size?: FlowerSize;
  color: Colors;
  className?: string;
}

export default function Flower({ size = "1rem", color = "pink", className }: FlowerProps) {
  return (
    <div
      className={`${styles.wrapper}${className ? ` ${className}` : ""}`}
      style={
        {
          "--flower-size": size,
          "--petal-color": flowerColors[color].petal,
          "--miolo-color": flowerColors[color].miolo,
        } as React.CSSProperties
      }
    >
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={styles.petal}
          style={{ transform: `translate(-50%, -100%) rotate(${i * 36}deg)` }}
        />
      ))}
      <div className={styles.miolo} />
    </div>
  );
}
