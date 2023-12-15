import styled from "styled-components";
import Layout from "../../templates/Layout";
import Collections from "../MainPage/Collections";

const MainText = styled.h2`
  color: ${(props) => props.theme.text};
`;

const Description = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 1em;
`;

export default function CollectionsPage() {
  return (
    <Layout>
      <MainText>
        Discover our collections for every taste, mood, and celebration!
      </MainText>
      <Description>
        We have put together several collections of cocktails that are suitable
        for a special mood or occasion, if you want to experience the classic
        taste of everyone&apos;s favorite drinks or just try something new.
      </Description>
      <Collections />
    </Layout>
  );
}
