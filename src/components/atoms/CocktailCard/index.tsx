import styled, { DefaultTheme } from "styled-components";
import { Cocktail } from "../../../types/Cocktail";

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
  max-width: 100%;
  box-shadow: 0 0.2em 1.5em -0.8em ${(props) => props.theme.accentLighter};
  border-radius: 1em;
  max-width: 18em;
  background-image: url(${(props) => props.url});
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

const IngredientsWrapper = styled.div`
  color: ${(props) => props.theme.textInversion};
  display: flex;
  overflow: scroll;
  width: 100%;
`;

type CocktailCardProps = {
  info: Cocktail;
};

// fix this. Connect with Cocktail type, if name is null, so should be null measure.
type Ingrdient = {
  name: string;
  measure: string | null;
};

function CocktailCard({ info }: CocktailCardProps) {
  let ingredients: Ingrdient[] = [];

  for (let i = 0; i < 15; i++) {
    const ingredientNameKey = `strIngredient${i}` as keyof Cocktail;
    const ingredientMeasureKey = `strMeasure${i}` as keyof Cocktail;
    const ingredientName = info[ingredientNameKey];
    const ingredientMeasure = info[ingredientMeasureKey];

    if (!ingredientName) {
      continue;
    }

    ingredients.push({
      name: ingredientName,
      measure: ingredientMeasure,
    });
  }

  const ingredientsInfo = ingredients.map((ingredient) => {
    return <h3>{`${ingredient.name}: ${ingredient.measure}`}</h3>;
  });

  return (
    <InnerWrapper>
      <ColorFilter>
        <Card url={info.strDrinkThumb}>
          <IngredientsWrapper>{ingredientsInfo}</IngredientsWrapper>
        </Card>
      </ColorFilter>
      <CocktailTitle>{info.strDrink}</CocktailTitle>
    </InnerWrapper>
  );
}

export default CocktailCard;
