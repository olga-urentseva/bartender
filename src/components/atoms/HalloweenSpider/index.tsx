import { useState } from "react";
import styled, { keyframes } from "styled-components";

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
  isPink: boolean;
}

const SpiderBody = styled.div<SpiderBodyProps>`
  width: 50px;
  height: 40px;
  background: ${(props) => (props.isPink ? "#ef5cd9" : "#222")};
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

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

const LegsContainer = styled.div<{ isLeft?: boolean; isPink: boolean }>`
  position: absolute;
  bottom: -10%;
  z-index: -1;
  ${(props) => (props.isLeft ? "left: -70%;" : "right: -60%;")}
`;

const Leg = styled.div<{ index: number; isLeft?: boolean; isPink: boolean }>`
  width: 40px;
  height: 20px;
  margin-top: -10px;
  border: 2.5px solid transparent;
  border-top-color: ${(props) => (props.isPink ? "#f646d0" : "#333")};
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

function HalloweenSpider() {
  const [isSpiderOnTheRight, setIsSpiderOnTheRight] = useState(true);

  function escape() {
    setIsSpiderOnTheRight(!isSpiderOnTheRight);
  }

  const [isPink, setIsPink] = useState(false);

  const handleClick = () => {
    setIsPink(!isPink);
  };

  return (
    <SpiderWrapper isSpiderOnTheRight={isSpiderOnTheRight}>
      <Spiderweb />
      <SpiderBody isPink={isPink} onClick={handleClick}>
        <Eye isLeft />
        <Eye />
      </SpiderBody>
      <LegsContainer isLeft isPink={isPink} onClick={escape}>
        {[0, 1, 2].map((index) => (
          <Leg key={`left-${index}`} index={index} isLeft isPink={isPink} />
        ))}
      </LegsContainer>
      <LegsContainer isPink={isPink} onClick={escape}>
        {[0, 1, 2].map((index) => (
          <Leg key={`right-${index}`} index={index} isPink={isPink} />
        ))}
      </LegsContainer>
    </SpiderWrapper>
  );
}

export default HalloweenSpider;
