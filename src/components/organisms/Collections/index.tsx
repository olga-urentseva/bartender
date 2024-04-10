import { Link } from "react-router-dom";
import styled from "styled-components";

import getCollections from "../../../api/getCollections";

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

const Title = styled.h3`
  font-size: 2em;
  margin: 0;
  text-decoration: none;
  color: ${(props) => props.theme.textInversion};
  text-shadow: 2px 3px 10px ${(props) => props.theme.shadow};
`;

const Card = styled.div<{ imgUrl: string }>`
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  padding: 1rem;
  border-radius: 1em;
  transition: transform 0.3s ease-in-out;
  height: 13em;
  box-shadow: 0 0.5em 1.5em -0.8em ${(props) => props.theme.accentLight};

  &:hover,
  &:focus {
    transform: scale(1.05);

    ${Description}, ${Title} {
      opacity: 100%;
      transition-delay: 0.1s;
      text-shadow: 2px 3px 10px ${(props) => props.theme.shadow};
    }
  }
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

export default function Collections({
  data,
}: {
  data: Awaited<ReturnType<typeof getCollections>>;
}) {
  return (
    <Wrapper>
      {data.length === 0 ? (
        <>nothing</>
      ) : (
        data.map((data) => (
          <CollectionItem
            key={data.id}
            title={data.collectionName}
            imgUrl={data.imageUrl}
            to={`/collections/${data.id}`}
            description={data.description}
          />
        ))
      )}
    </Wrapper>
  );
}
