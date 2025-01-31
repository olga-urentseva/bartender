import styled from "styled-components";
import Layout from "../../templates/Layout";
import Collections from "../../organisms/Collections";
import getCollections from "../../../api/getCollections";
import { useLoaderData } from "react-router-dom";

const MainText = styled.h2`
  color: ${(props) => props.theme.text};
`;

const Description = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 1em;
`;
export async function loader() {
  const collections = await getCollections();
  return { collectionsData: collections };
}

export default function CollectionsPage() {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

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
      <Collections data={loaderData.collectionsData} />
    </Layout>
  );
}
