import styled from "styled-components";
import LogoComponent from "..";
import PalmTree from "./Palm";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const SunMoon = styled.div`
  width: 0.7rem;
  height: 0.7rem;
  background: light-dark(oklch(0.87 0.13 82.84), oklch(0.93 0.0271 91.06));
  border-radius: 50%;
  position: absolute;
  top: -0.2em;

  box-shadow:
    0 0 0.2rem light-dark(oklch(0.87 0.1577 91.06), oklch(0.93 0.0271 91.06)),
    0 0 1rem light-dark(oklch(0.87 0.1577 91.06), oklch(0.93 0.0271 91.06)),
    0 0 2rem light-dark(oklch(0.87 0.1577 91.06), oklch(0.93 0.0271 91.06));

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: light-dark(transparent, ${(props) => props.theme.background});
    opacity: 97%;
    box-shadow: 0 0 0.2rem
      light-dark(transparent, ${(props) => props.theme.backgroundMuted});
    transform: translateX(30%);
  }
`;

const StyledPalmTree = styled(PalmTree)``;
export default function SummerLogo() {
  return (
    <Wrapper>
      <StyledPalmTree />
      <LogoComponent />
      <SunMoon />
    </Wrapper>
  );
}
