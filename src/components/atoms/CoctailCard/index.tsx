import { ReactComponentElement, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";

type InnerWrapperProps = {
  theme: DefaultTheme;
  url: string;
};

const InnerWrapper = styled.div<InnerWrapperProps>`
  display: flex;
  max-width: 100%;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  width: 100%;
  max-width: 18em;
  height: 15em;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  transition: 0.3s;

  h3,
  h4,
  div {
    display: none;
  }

  :hover {
    cursor: pointer;
    background-image: none;
    background-color: ${(props) => props.theme.accentLighter};
  }

  :hover h3,
  :hover h4,
  :hover div {
    display: block;
  }
`;

type CardProps = {
  url: string;
  coctailName: string;
};

function CoctailCard({ url, coctailName = "Name" }: CardProps) {
  return (
    <InnerWrapper url={url}>
      <h3>{coctailName}</h3>
      <h4>Ingredients</h4>
    </InnerWrapper>
  );
}

export default CoctailCard;
