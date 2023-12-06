import { Link } from "react-router-dom";
import styled from "styled-components";

import christmasImagePath from "./christmas-cocktails.jpg";
import classicImagePath from "./classic-cocktails.jpg";
import spicyCocktails from "./spicy-cocktails.jpeg";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: 1fr;
`;

const Collection = styled.div``;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Description = styled.h4`
  color: ${(props) => props.theme.textInversion};
  margin: 0;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
`;

const Card = styled.div<{ imgUrl: string }>`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  padding: 1rem;
  border-radius: 1em;
  transition: transform 0.3s ease-in-out;
  height: 100%;
  box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLight};

  &:hover,
  &:focus {
    transform: scale(1.05);

    ${Description} {
      opacity: 100%;
      transition-delay: 0.1s;
    }
  }
`;
const Title = styled.h3`
  font-size: 2em;
  margin: 0;
  text-decoration: none;
  color: ${(props) => props.theme.textInversion};
`;

function CollectionItem({
  title,
  imgUrl,
  to,
  description,
}: {
  title: string;
  imgUrl: string;
  to: string;
  description: string;
}) {
  return (
    <Collection>
      <StyledLink to={to}>
        <Card imgUrl={imgUrl}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Card>
      </StyledLink>
    </Collection>
  );
}

export default function Collections({ ...otherProps }) {
  return (
    <Wrapper {...otherProps}>
      <CollectionItem
        title="Top 20 Holiday cocktails"
        imgUrl={christmasImagePath}
        to="#"
        description="Cheers to the holidays!"
      />
      <CollectionItem
        title="Favourite classic cocktails"
        imgUrl={classicImagePath}
        to="#"
        description="Old classic never gets too old"
      />
      <CollectionItem
        title="Top 10 Spicy cocktails"
        imgUrl={spicyCocktails}
        to="#"
        description="Spicy cocktails for cold weather"
      />
    </Wrapper>
  );
}
