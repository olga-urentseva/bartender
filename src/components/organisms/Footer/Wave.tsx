import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  display: block;
  //filter: drop-shadow(0 -0.1em 0.5em ${(props) => props.theme.accentLighter});
`;

const PathFirstWave = styled.path`
  fill: ${(props) => props.theme.accentLighter};
`;

const PathSecondWave = styled.path`
  fill: ${(props) => props.theme.accent};
`;

function Wave() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 130 1440 140">
      <PathFirstWave d="M0 400V200c42 4 84 8 141 5s129-13 196-25 127-27 167-29 58 8 109 30 136 57 203 70 116 3 166-16 100-46 155-38 114 52 165 58 95-24 138-55v200H0Z" />
      <PathSecondWave d="M 0,700 C 0,700 0,233 0,233 C 93.46410256410257,199.46923076923076 186.92820512820515,165.93846153846155 276,164 C 365.07179487179485,162.06153846153845 449.75128205128203,191.71538461538458 521,203 C 592.248717948718,214.28461538461542 650.0666666666667,207.2 713,187 C 775.9333333333333,166.8 843.9820512820512,133.48461538461538 920,149 C 996.0179487179488,164.51538461538462 1080.0051282051281,228.8615384615385 1168,251 C 1255.9948717948719,273.1384615384615 1347.997435897436,253.06923076923076 1440,233 C 1440,233 1440,700 1440,700 Z" />
    </Svg>
  );
}

export default Wave;
