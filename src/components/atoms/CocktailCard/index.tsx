import React from "react";
import styled, { DefaultTheme } from "styled-components";

type CardProps = {
  theme: DefaultTheme;
  picture: string;
};

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 18em;
  width: 100%;
  height: auto;
`;

const ColorFilter = styled.div`
  width: auto;
  height: auto;
  background-color: ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  opacity: 80%;
`;

const Card = styled.div<CardProps>`
  display: flex;
  height: 12em;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  max-width: 18em;
  background-image: url(${(props) => props.picture});
  background-position: center;
  background-size: cover;
  transition: 0.3s;
  padding: 0 1em;

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
    <InnerWrapper>
      <ColorFilter>
        <Card picture={picture} />
      </ColorFilter>
      <CocktailTitle>{cocktailName}</CocktailTitle>
    </InnerWrapper>
  );
}

export default CocktailCard;
