import React from "react";
import styled, { DefaultTheme } from "styled-components";

type CardProps = {
  theme: DefaultTheme;
  picture: string;
};

const Card = styled.div``;

const Image = styled.div<CardProps>`
  box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-size: 100%;
  -webkit-transition: 0.2s ease-in;
  transition: 0.2s ease-in;
  position: relative;
  padding-bottom: 70%;

  &:hover {
    cursor: pointer;
    background-size: 105%;
    box-shadow: 0 1.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  }

  &::after {
    background-color: ${(props) => props.theme.accentLighter};
    border-radius: 1em;
    opacity: 20%;
    display: block;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const CocktailTitle = styled.h2`
  font-size: 1.2em;
  color: ${(props) => props.theme.text};
`;

type CocktailCardProps = {
  cocktailName: string;
  picture: string;
  id: string;
};

function CocktailCard({ cocktailName, picture, id }: CocktailCardProps) {
  return (
    <Card>
      <Image picture={picture} />
      <CocktailTitle>{cocktailName}</CocktailTitle>
    </Card>
  );
}

export default CocktailCard;
