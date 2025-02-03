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
    stroke: #4caf50;
  }

  .leaf {
    fill: #4caf50;
    stroke: none;
  }
`;

export default function FlowerWire() {
  return (
    <Wire xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1334 454">
      <path
        id="path-1"
        d="M73.205264,260.346963q63.774245,84.182002,198.975644,29.336152"
      />
      <path
        id="path-2"
        d="M305.942191,126.049545q-22.980794,8.110869-41.906154,29.739851"
      />
      <path
        id="path-3"
        d="M341.089287,276.100612q37.85072-4.971846,51.368834-27.036229"
      />
      <path
        id="path-4"
        d="M481.677675,170.659321q50.017021-81.108686,273.065904-56.776079"
      />
      <path
        id="path-5"
        d="M815.575094,139.724577q33.795285,14.713008,32.443474,22.823876"
      />
      <path
        id="path-6"
        d="M848.018568,270.693366q-1.351811,18.989749,9.46268,18.989749"
      />
      <path
        id="path-7"
        d="M914.257327,301.785029q36.498908-52.629355,198.716278-16.176092"
      />
      <path
        id="path-8"
        d="M1142.340357,241.376105q84.584604-78.701389-29.366752-115.326559"
      />

      <path
        className="leaf"
        transform="translate(73.205264, 260.346963) rotate(5)"
        d="M0,0 Q10,10 20,0 Q30,-10 20,-20 Q10,-30 0,-20 Z"
      />
      <path
        className="leaf"
        transform="translate(305.942191, 126.049545) rotate(80)"
        d="M0,0 Q10,10 20,0 Q30,-10 20,-20 Q10,-30 0,-20 Z"
      />
      <path
        className="leaf"
        transform="translate(341.089287, 276.100612) rotate(-70)"
        d="M0,0 Q10,10 20,0 Q30,-10 20,-20 Q10,-30 0,-20 Z"
      />
      <path
        className="leaf"
        transform="translate(481.677675, 170.659321) rotate(30)"
        d="M0,0 Q10,10 20,0 Q30,-10 20,-20 Q10,-30 0,-20 Z"
      />
      <path
        className="leaf"
        transform="translate(914.257327, 301.785029) rotate(45)"
        d="M0,0 Q10,10 20,0 Q30,-10 20,-20 Q10,-30 0,-20 Z"
      />
    </Wire>
  );
}
