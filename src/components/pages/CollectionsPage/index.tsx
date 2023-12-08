import styled from "styled-components";
import Layout from "../../templates/Layout";
import Collections from "../MainPage/Collections";

const Description = styled.h2`
  color: ${(props) => props.theme.text};
`;

export default function CollectionsPage() {
  return (
    <Layout>
      <Description>
        Discover our collections for every taste, mood, and celebration!
      </Description>
      <Collections />
    </Layout>
  );
}
