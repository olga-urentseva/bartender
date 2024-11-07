import styled from "styled-components";

const Wire = styled.svg`
  width: 13.9em;
  height: auto;
  shape-rendering: geometricPrecision;
  text-rendering: geometricPrecision;
  position: absolute;
  top: -11px;
  left: -1em;

  path {
    fill: none;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-miterlimit: 10;
  }

  #path1 {
    stroke: #3f5787;
    stroke-width: 2.668;
  }

  #path2 {
    stroke: #000;
    d: path("M73.205264,260.346963q63.774245,84.182002,198.975644,29.336152");
  }

  #path3 {
    stroke: #000;
    d: path("M305.942191,126.049545q-22.980794,8.110869-41.906154,29.739851");
  }

  #path4 {
    stroke: #000;
    d: path("M341.089287,276.100612q37.85072-4.971846,51.368834-27.036229");
  }

  #path5 {
    stroke: #000;
    d: path("M481.677675,170.659321q50.017021-81.108686,273.065904-56.776079");
  }

  #path6 {
    stroke: #000;
    d: path("M815.575094,139.724577q33.795285,14.713008,32.443474,22.823876");
  }

  #path7 {
    stroke: #000;
    d: path("M848.018568,270.693366q-1.351811,18.989749,9.46268,18.989749");
  }

  #path8 {
    stroke: #000;
    d: path("M914.257327,301.785029q36.498908-52.629355,198.716278-16.176092");
  }

  #path9 {
    stroke: #000;
    d: path("M1142.340357,241.376105q84.584604-78.701389-29.366752-115.326559");
  }
`;

export default function GarlandWire() {
  return (
    <Wire xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1334 454">
      <path id="path1" />
      <path id="path2" />
      <path id="path3" />
      <path id="path4" />
      <path id="path5" />
      <path id="path6" />
      <path id="path7" />
      <path id="path8" />
      <path id="path9" />
    </Wire>
  );
}
