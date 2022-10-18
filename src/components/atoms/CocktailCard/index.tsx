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

// fix this. Connect with Cocktail type, if name is null, so should be null measure.
// type Ingrdient = {
//   name: string;
//   measure: string | null;
// };

function CocktailCard({ cocktailName, picture, id }: CocktailCardProps) {
  // const ingredients: Ingrdient[] = [];
  //
  // for (let i = 0; i < 15; i++) {
  //   const ingredientNameKey = `strIngredient${i}` as keyof Cocktail;
  //   const ingredientMeasureKey = `strMeasure${i}` as keyof Cocktail;
  //   const ingredientName = info[ingredientNameKey];
  //   const ingredientMeasure = info[ingredientMeasureKey];
  //
  //   if (!ingredientName) {
  //     continue;
  //   }
  //
  //   ingredients.push({
  //     name: ingredientName,
  //     measure: ingredientMeasure,
  //   });
  // }

  // const ingredientsInfo = ingredients.map((ingredient) => {
  //   return (
  //     <h3
  //       key={ingredient.name}
  //     >{`${ingredient.name}: ${ingredient.measure}`}</h3>
  //   );
  // });

  return (
    <Card>
      <Image picture={picture} />
      <CocktailTitle>{cocktailName}</CocktailTitle>
    </Card>
  );
}

export default CocktailCard;
