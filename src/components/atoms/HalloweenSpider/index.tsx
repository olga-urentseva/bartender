import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useLocalStorage from "../../../hooks/useLocalStorage";

const lookAnimation = keyframes`
  0%, 40%, 100% {
    transform: translateX(0);
  }
  45%, 95% {
    transform: translateX(-110%);
  }
`;

const swingAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const fireworkFallAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0rem) translateX(0rem) rotate(0deg);
  }
  10% {
    opacity: 1;
    transform: translateY(-1.875rem) translateX(var(--spread-x)) rotate(90deg);
  }
  100% {
    opacity: 0;
    transform: translateY(12.5rem) translateX(var(--spread-x)) rotate(720deg);
  }
`;

const SpiderWrapper = styled.div<{ isSpiderOnTheRight: boolean }>`
  position: absolute;
  display: inline-block;
  top: 0;
  left: ${({ isSpiderOnTheRight }) => (isSpiderOnTheRight ? "85%" : "10%")};
  margin-right: 5em;
  animation: ${swingAnimation} 2s infinite;
  transform-origin: top;
  transition: 0.8s ease-in-out;
  transform: scale(0.5);
`;

const Spiderweb = styled.div`
  width: 2px;
  height: 100px;
  margin-left: 24px;
  background: rgba(77, 75, 75, 0.7);
`;

interface SpiderBodyProps {
  clickCount: number;
}

const getSpiderColor = (clickCount: number) => {
  const colors = [
    "#222",      // 0 clicks - black
    "#4169E1",   // 1 click - royal blue
    "#1E90FF",   // 2 clicks - dodger blue
    "#00BFFF",   // 3 clicks - deep sky blue
    "#87CEEB",   // 4 clicks - sky blue
    "#ADD8E6"    // 5 clicks - light blue
  ];
  return colors[clickCount] || "#222";
};

const SpiderBody = styled.div<SpiderBodyProps>`
  width: 50px;
  height: 40px;
  background: ${(props) => getSpiderColor(props.clickCount)};
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Eye = styled.div<{ isLeft?: boolean }>`
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: 10px;
  background: #fff;
  border-radius: 50%;
  ${(props) => (props.isLeft ? "left: 10px;" : "right: 10px;")}

  &:after {
    background: #222;
    width: 3px;
    height: 3px;
    content: "";
    display: block;
    margin: 55%;
    border-radius: 50%;
    animation: ${lookAnimation} 4s infinite;
  }
`;

const LegsContainer = styled.div<{ isLeft?: boolean; clickCount: number }>`
  position: absolute;
  bottom: -10%;
  z-index: -1;
  ${(props) => (props.isLeft ? "left: -70%;" : "right: -60%;")}
`;

const getColor = (clickCount: number) => {
  const colors = [
    "#333",      // 0 clicks - dark gray
    "#2E4BC6",   // 1 click - darker royal blue
    "#1873CC",   // 2 clicks - darker dodger blue
    "#0099CC",   // 3 clicks - darker deep sky blue
    "#6BB1D4",   // 4 clicks - darker sky blue
    "#8BC2D1"    // 5 clicks - darker light blue
  ];
  return colors[clickCount] || "#333";
};

const Leg = styled.div<{ index: number; isLeft?: boolean; clickCount: number }>`
  width: 40px;
  height: 20px;
  margin-top: -10px;
  border: 2.5px solid transparent;
  border-top-color: ${(props) => getColor(props.clickCount)};
  border-radius: 20px 20px 0 0;
  transition: border-top-color 0.3s ease;

  ${(props) => {
    const angle = props.isLeft
      ? [10, -20, -50][props.index]
      : [-10, 20, 50][props.index];
    const margin = props.isLeft
      ? [5, 10, 15][props.index]
      : [-5, -10, -15][props.index];

    return `
      transform: rotate(${angle}deg);
      margin-left: ${margin}px;
    `;
  }}
`;

const Heart = styled.div<{ delay: number; spreadX: number }>`
  position: absolute;
  font-size: 1.25rem;
  animation: ${fireworkFallAnimation} 3s ease-out forwards;
  animation-delay: ${(props) => props.delay}ms;
  left: 1.5625rem;
  top: 7.1875rem;
  pointer-events: none;
  z-index: -2;
  --spread-x: ${(props) => props.spreadX / 16}rem;
  
  &:before {
    content: '❤️';
  }
`;

function HalloweenSpider() {
  const [isSpiderOnTheRight, changeSpiderPlacement] = useLocalStorage("isSpiderOnTheRight", true);
  function escape() {
    if (areHeartsFalling) {
      return
    } else {
      changeSpiderPlacement(!isSpiderOnTheRight);
    }
    
  }

  const [clickCount, setClickCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [areHeartsFalling, setAreHeartsFalling] = useState(false);
  const [heartPositions, setHeartPositions] = useState<number[]>([]);

  const handleClick = () => {
    if (!areHeartsFalling) {
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      if (newClickCount === 5) {
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

  return (
    <SpiderWrapper isSpiderOnTheRight={isSpiderOnTheRight}>
      <Spiderweb />
      <SpiderBody clickCount={clickCount} onClick={handleClick}>
        <Eye isLeft />
        <Eye />
      </SpiderBody>
      {showHearts && heartPositions.map((spreadX, index) => (
        <Heart 
          key={index}
          delay={index * 200}
          spreadX={spreadX}
        />
      ))}
      <LegsContainer isLeft clickCount={clickCount} onClick={escape}>
        {[0, 1, 2].map((index) => (
          <Leg key={`left-${index}`} index={index} isLeft clickCount={clickCount} />
        ))}
      </LegsContainer>
      <LegsContainer clickCount={clickCount} onClick={escape}>
        {[0, 1, 2].map((index) => (
          <Leg key={`right-${index}`} index={index} clickCount={clickCount} />
        ))}
      </LegsContainer>
    </SpiderWrapper>
  );
}

export default HalloweenSpider;
