import styled from "styled-components";
import Logo from "../";
import Flower from "./Flower";
import FlowerWire from "./FlowerWire";

const InnerWrapper = styled.div`
  position: relative;
`;

const Flower1 = styled(Flower)`
  position: absolute;
  top: 1.2em;
  left: -0.6em;
`;

const Flower2 = styled(Flower)`
  position: absolute;
  top: 2em;
  left: 1.7em;
`;

const Flower3 = styled(Flower)`
  position: absolute;
  top: -0.3em;
  left: 6.7em;
`;

const Flower4 = styled(Flower)`
  position: absolute;
  top: 2.2em;
  left: 7.8em;
`;

const Flower5 = styled(Flower)`
  position: absolute;
  top: 1.7em;
  left: 10.2em;
`;

const Flower6 = styled(Flower)`
  position: absolute;
  top: 0;
  left: 10em;
`;

const Flower7 = styled(Flower)`
  position: absolute;
  top: 2em;
  left: 5em;
`;

const Flower8 = styled(Flower)`
  position: absolute;
  top: 0em;
  left: 2em;
`;

export default function SpringLogo() {
  return (
    <InnerWrapper>
      <FlowerWire />
      <Flower1 size="1rem" color="blue" />
      <Logo />

      <Flower2 size="1rem" color="pink" />
      <Flower3 size="1.25rem" color="blue" />
      <Flower4 size="1rem" color="pink" />
      <Flower5 size="0.85rem" color="white" />
      <Flower6 size="1rem" color="pink" />
      <Flower7 size="0.85rem" color="white" />
      <Flower8 size="0.85rem" color="white" />
    </InnerWrapper>
  );
}
