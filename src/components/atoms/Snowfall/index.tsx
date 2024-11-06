import styled from "styled-components";

const InnerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1000;
`;

interface SnowFlakeProps {
  left: number;
  duration: number;
  delay: number;
}

const SnowFlake = styled.div<SnowFlakeProps>`
  width: 0.3em;
  height: 0.3em;
  border-radius: 50%;
  background-color: #b6e3ff;
  position: absolute;
  top: -1em; // Start slightly above viewport
  opacity: 0; // Start with 0 opacity
  animation: fall ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  left: ${(props) => props.left}%;
  will-change: transform, opacity; // Optimize animation performance

  @keyframes fall {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`;

const SNOWFLAKES_NUMBER = 30;

function Snowfall() {
  return (
    <InnerWrapper>
      {Array.from({ length: SNOWFLAKES_NUMBER }).map((_, index) => (
        <SnowFlake
          key={index}
          left={Math.random() * 100}
          duration={Math.random() * 3 + 7}
          delay={Math.random() * 5}
        />
      ))}
    </InnerWrapper>
  );
}

export default Snowfall;
