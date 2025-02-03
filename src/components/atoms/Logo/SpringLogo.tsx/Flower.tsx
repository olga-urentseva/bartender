import styled from "styled-components";

type Colors = "pink" | "blue" | "white";
type FlowerSize = "0.85rem" | "1rem" | "1.15rem" | "1.25rem";

const flowerColors: Record<Colors, { petal: string; miolo: string }> = {
  pink: {
    petal: "#f6b4e0",
    miolo: "#ffffff",
  },
  blue: {
    petal: "#9fbfe4",
    miolo: "#ffffff",
  },
  white: {
    petal: "#fff780",
    miolo: "#ffffff",
  },
};

const Wrapper = styled.div<{
  $size: FlowerSize;
  $color: Colors;
}>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  position: absolute;
  top: 1em;
  left: 5em;
`;

const Miolo = styled.div<{ $size: string; $color: Colors }>`
  width: ${(props) => `calc(${props.$size} * 0.3)`};
  height: ${(props) => `calc(${props.$size} * 0.3)`};
  border-radius: 50%;
  background-color: ${(props) => flowerColors[props.$color].miolo};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0.125rem 0.25rem rgba(96, 95, 95, 0.3);
`;

const Petal = styled.div<{ rotation: number; $size: string; $color: Colors }>`
  width: ${(props) => `calc(${props.$size} * 0.2)`};
  height: ${(props) => `calc(${props.$size} * 0.42)`};
  background-color: ${(props) => flowerColors[props.$color].petal};
  border-radius: 45%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform-origin: 51% 125%;
  transform: translate(-50%, -100%) rotate(${(props) => props.rotation}deg);
`;

interface FlowerProps {
  size?: FlowerSize;
  color: Colors;
  className?: string;
}

export default function Flower({
  size = "1rem",
  color = "pink",
  className,
}: FlowerProps) {
  return (
    <Wrapper $size={size} $color={color} className={className}>
      {[...Array(10)].map((_, i) => (
        <Petal key={i} rotation={i * 36} $size={size} $color={color} />
      ))}
      <Miolo $size={size} $color={color} />
    </Wrapper>
  );
}
