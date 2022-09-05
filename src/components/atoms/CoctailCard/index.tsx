import { ReactComponentElement, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";

type CardProps = {
  theme: DefaultTheme;
  url: string;
};

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 18em;
  width: 100%;
  height: auto;
`;

const Card = styled.div<CardProps>`
  display: flex;
  height: 12em;
  max-width: 100%;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  max-width: 18em;
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

const CoctailTitle = styled.h2`
  font-size: 1.2em;
  color: ${(props) => props.theme.text};
`;

type CoctailCardProps = {
  url: string;
  coctailName: string;
};

function CoctailCard({ url, coctailName = "Name" }: CoctailCardProps) {
  return (
    <InnerWrapper>
      <Card url={url}>
        <h3>{coctailName}</h3>
        <h4>Ingredients</h4>
      </Card>
      <CoctailTitle>{coctailName}</CoctailTitle>
    </InnerWrapper>
  );
}

export default CoctailCard;
