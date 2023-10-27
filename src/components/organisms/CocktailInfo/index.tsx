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
  measure: string;
  id: string;
  name: string;
};
const CocktailInfo = ({ data }: { data: Cocktail }) => {
  const recipe = data.ingredients.map((ingredient: Ingredient) => {
    const measure = ingredient.measure;
    const ingredientName = `${ingredient.name
      .charAt(0)
      .toLocaleUpperCase()}${ingredient.name.slice(1)}`;
    return (
      <InfoText key={ingredient.id}>{`${ingredientName}: ${
        measure || "up to you"
      }`}</InfoText>
    );
  });

  return (
    <Wrapper>
      <CocktailTitle>{`${data.cocktailName}`}</CocktailTitle>
      <FirstColumn>
        <ImageWrapper>
          <Image src={data.pictureURL} />
        </ImageWrapper>
        <RecipeWrapper>
          <SubTitle>Ingredients:</SubTitle>
          {recipe}
        </RecipeWrapper>
      </FirstColumn>
      <AdditionalInfoWrapper>
        <InfoText>
          <strong>How to prepare:</strong> {data.instruction}
        </InfoText>
        <InfoText>
          <strong>Alcoholic:</strong>{" "}
          {data.isAlcoholic === "true" ? "Yes" : "No"}
        </InfoText>
        <InfoText>
          <strong>Glass:</strong> {data.glass}
        </InfoText>
      </AdditionalInfoWrapper>
    </Wrapper>
  );
};

export default CocktailInfo;
