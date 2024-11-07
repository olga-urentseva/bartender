import styled, { keyframes } from "styled-components";
import Logo from "../Logo";
import GarlandWire from "./GarlandWire";
import { PropsWithChildren } from "react";

const colorCycle = keyframes`
  0% {
    background-color: oklch(0.74 0.153 237.621);
  }

  25% {
    background-color: oklch(0.899 0.185 97.822);
  }

  50% {
    background-color: oklch(0.54 0.254 266.069);
  }

  75% {
    background-color: oklch(0.849 0.273 140.592);
  }

  100% {
    background-color: oklch(0.629 0.257 29.11);
  }

`;

const getRandomDelay = () => `${Math.random() * 2}s`;

const InnerWrapper = styled.div`
  position: relative;
`;

const OriginalLogo = styled(Logo)`
  color: ${({ theme }) => theme.accentLight};
`;

const ChristmasLamp = styled.div`
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  position: absolute;
  animation: ${colorCycle} 2s infinite;
  animation-delay: ${getRandomDelay};
`;

const Lamp1 = styled(ChristmasLamp)`
  left: 2em;
  top: 2.1em;
  background-color: oklch(0.629 0.257 29.11);
`;

const Lamp2 = styled(ChristmasLamp)`
  left: 2.3em;
  top: 0.4em;
  background-color: oklch(0.849 0.273 140.592);
`;

const Lamp3 = styled(ChristmasLamp)`
  left: -0.5em;
  top: 1.5em;
  background-color: oklch(0.899 0.185 97.822);
`;

const Lamp4 = styled(ChristmasLamp)`
  left: 10.7em;
  top: 2em;
  background-color: oklch(0.54 0.254 266.069);
`;

const Lamp5 = styled(ChristmasLamp)`
  left: 5em;
  top: 1.8em;
  background-color: oklch(0.899 0.185 97.822);
`;
const Lamp6 = styled(ChristmasLamp)`
  left: 8em;
  top: 2.2em;
  background-color: oklch(0.54 0.254 266.069);
`;

const Lamp8 = styled(ChristmasLamp)`
  left: 10em;
  top: 0.4em;
  background-color: oklch(0.74 0.153 237.621);
`;

const Lamp7 = styled(ChristmasLamp)`
  left: 7em;
  top: 0.4em;
  background-color: oklch(0.899 0.185 97.822);
`;

export default function ChristmasLogo({ children }: PropsWithChildren) {
  return (
    <InnerWrapper>
      <GarlandWire />
      <Lamp1 />
      <Lamp2 />
      <OriginalLogo>{children}</OriginalLogo>
      <Lamp3 />
      <Lamp4 />
      <Lamp5 />
      <Lamp6 />
      <Lamp7 />
      <Lamp8 />
    </InnerWrapper>
  );
}
