import styled, { keyframes } from "styled-components";
import "ios-vibrator-pro-max";

import soundUrl from "./sound.wav";

const sway = keyframes`
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
`;

const bloom = keyframes`
  0% { transform: scaleY(0.7) scaleX(0.85); }
  60% { transform: scaleY(1.08) scaleX(1.05); }
  100% { transform: scaleY(1) scaleX(1); }
`;

const grow = keyframes`
  0% { transform: scaleY(0.6); transform-origin: bottom; }
  100% { transform: scaleY(1); transform-origin: bottom; }
`;

const Wrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48px;
  gap: 0;
  position: relative;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    border-radius: 4px;
  }
`;

const TulipSvg = styled.svg`
  overflow: visible;
  transform-origin: bottom center;
  transform: rotate(7deg);

  /* default colors */
  .petal {
    fill: #a78bfa;
  }
  .petal-dark {
    fill: #7c3aed;
  }
  .leaf {
    fill: #7bb188;
  }
  .stem-line {
    stroke: #7bb188;
  }

  /* spring colors */
  .spring:root & .petal {
    fill: #e87ea1;
  }
  .spring:root & .petal-dark {
    fill: #c45c7e;
  }
  .spring:root & .leaf {
    fill: #5da277;
  }
  .spring:root & .stem-line {
    stroke: #5da277;
  }

  .stem {
    transform-origin: bottom center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .petals {
    transform-origin: bottom center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .leaf {
    transform-origin: 50% 100%;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0.9;
  }

  ${Wrapper}:hover & {
    animation: ${sway} 1.2s ease-in-out infinite;

    .stem {
      animation: ${grow} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .petals {
      animation: ${bloom} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .leaf-left {
      transform: rotate(-20deg) scaleX(1.2);
    }

    .leaf-right {
      transform: rotate(20deg) scaleX(1.2);
    }
  }
`;

const Shadow = styled.div`
  background-color: ${(props) => props.theme.secondary};
  width: 1.8rem;
  height: 0.25rem;
  border-radius: 50%;
  position: absolute;
  bottom: 7px;
`;

interface Props {
  isSpring: boolean;
  onClick: () => void;
}

const sound = new Audio(soundUrl);

export function TulipToggleButton({ isSpring, onClick }: Props) {
  return (
    <Wrapper
      onClick={() => {
        sound.currentTime = 0;
        sound.play();
        navigator.vibrate(100);
        onClick();
      }}
      title={isSpring ? "Switch to Default theme" : "Switch to Spring theme"}
    >
      <Shadow />
      <TulipSvg width="52" height="60" viewBox="0 0 36 52">
        {/* Stem */}
        <g className="stem">
          <path
            className="stem-line"
            d="M18 50 Q17 38 18 28"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaf left */}
          <path
            className="leaf leaf-left"
            d="M17.5 40 Q10 36 9 30 Q14 33 17.5 38Z"
          />
          {/* Leaf right */}
          <path
            className="leaf leaf-right"
            d="M18.5 40 Q26 36 27 30 Q22 33 18.5 38Z"
          />
        </g>

        {/* Petals */}
        <g className="petals">
          {/* Center petal */}
          <ellipse className="petal" cx="18" cy="17" rx="5" ry="9" />
          {/* Left petal */}
          <ellipse
            className="petal"
            cx="15"
            cy="19"
            rx="4.5"
            ry="8"
            transform="rotate(-18 12 24)"
          />
          {/* Right petal */}
          <ellipse
            className="petal"
            cx="21"
            cy="19"
            rx="4.5"
            ry="8"
            transform="rotate(18 24 24)"
          />
          {/* Inner shading */}
          <ellipse
            className="petal-dark"
            cx="18"
            cy="19"
            rx="3"
            ry="5.5"
            opacity="0.35"
          />
        </g>
      </TulipSvg>
    </Wrapper>
  );
}
