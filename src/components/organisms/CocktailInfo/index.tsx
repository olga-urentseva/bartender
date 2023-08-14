import styled from "styled-components";

import { Cocktail } from "../../../types/Cocktail";

const Wrapper = styled.div``;

const CocktailTitle = styled.h2`
  color: ${(props) => props.theme.text};
  margin: 0 0 1em 0;
`;

const FirstColumn = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
`;
const ImageWrapper = styled.div`
  flex: 1 1 10rem;
`;

const RecipeWrapper = styled.div`
  flex: 5 0 15rem;
`;

const Image = styled.img`
  display: block;
  border-radius: 1em;
  -webkit-box-shadow: 0 0.3em 1.5em 0 ${(props) => props.theme.accentLight};
  -moz-box-shadow: 0 0.3em 1.5em 0 ${(props) => props.theme.accentLight};
  box-shadow: 0 0.3em 1em 0 ${(props) => props.theme.accentLight};
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const SubTitle = styled.h3`
  margin: 0 0 1em 0;
  color: ${(props) => props.theme.text};
`;

const InfoText = styled.h4`
  margin: 0.5em 0;
  color: ${(props) => props.theme.text};
  font-weight: inherit;
`;

const AdditionalInfoWrapper = styled.div`
  margin: 2em 0;
`;

type Ingredient = {
  name: string;
  measure: string | null;
  id: number;
};
const CocktailInfo = ({ data }: { data: Cocktail }) => {
  const ingredients: Ingredient[] = [];

  for (let i = 0; i < 15; i++) {
    const ingredientNameKey = `strIngredient${i}` as keyof Cocktail;
    const ingredientMeasureKey = `strMeasure${i}` as keyof Cocktail;
    const ingredientName = data[ingredientNameKey];
    const ingredientMeasure = data[ingredientMeasureKey];

    if (!ingredientName) {
      continue;
    }

    ingredients.push({
      id: i,
      name: ingredientName,
      measure: ingredientMeasure,
    });
  }

  const recipe = ingredients.map((ingredient) => {
    const measure = ingredient.measure || "up to you";
    return (
      <InfoText
        key={ingredient.id}
      >{`${ingredient.name}: ${measure}`}</InfoText>
    );
  });

  return (
    <Wrapper>
      <CocktailTitle>{`${data.strDrink}`}</CocktailTitle>
      <FirstColumn>
        <ImageWrapper>
          <Image src={data.strDrinkThumb} />
        </ImageWrapper>
        <RecipeWrapper>
          <SubTitle>Ingredients:</SubTitle>
          {recipe}
        </RecipeWrapper>
      </FirstColumn>
      <AdditionalInfoWrapper>
        <InfoText>
          <strong>How to prepare:</strong> {data.strInstructions}
        </InfoText>
        <InfoText>
          <strong>Type:</strong> {data.strAlcoholic}
        </InfoText>
        <InfoText>
          <strong>Category:</strong> {data.strCategory}
        </InfoText>
        <InfoText>
          <strong>Glass:</strong> {data.strGlass}
        </InfoText>
      </AdditionalInfoWrapper>
    </Wrapper>
  );
};

export default CocktailInfo;
