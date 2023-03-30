import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { Link, useLocation } from "react-router-dom";

type CardProps = {
  theme: DefaultTheme;
  picture: string;
};

const Image = styled.div<CardProps>`
  box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-size: 100%;
  -webkit-transition: 0.2s ease-in;
  transition: 0.2s ease-in;
  padding-bottom: 70%;
  position: relative;

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

const Card = styled.div`
  position: relative;

  &:hover,
  &:focus-within {
    ${Image} {
      background-size: 105%;
      box-shadow: 0 1.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
    }
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;

  ::before {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const CocktailTitle = styled.h2<{ highlight?: string }>`
  font-size: 1.2em;
  color: ${(props) => props.theme.text};
  text-transform: capitalize;
`;

const HighlightSymbols = styled.span`
  color: ${(props) => props.theme.textLighter};
`;

type CocktailCardProps = {
  cocktailName: string;
  picture: string;
  id: string;
  highlight?: string;
};

function CocktailCard({
  cocktailName,
  picture,
  id,
  highlight,
}: CocktailCardProps) {
  const location = useLocation();

  const cocktailLink = location.pathname.includes("cocktails")
    ? `${id}`
    : `cocktails/${id}`;

  return (
    <Card>
      <Image picture={picture} />
      <CardLink to={cocktailLink} key={id}>
        <CocktailTitle>
          {highlight
            ? cocktailName
                .toLocaleLowerCase()
                .split(highlight.toLocaleLowerCase())
                .flatMap((part, i) =>
                  i === 0
                    ? part
                    : [
                        <HighlightSymbols key={i}>
                          {highlight}
                        </HighlightSymbols>,
                        part,
                      ]
                )
                .map((part, i) => (
                  <React.Fragment key={i}>{part}</React.Fragment>
                ))
            : cocktailName}
        </CocktailTitle>
      </CardLink>
    </Card>
  );
}

export default CocktailCard;
