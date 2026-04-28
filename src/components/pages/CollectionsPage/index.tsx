import Layout from "../../templates/Layout";
import Collections from "../../organisms/Collections";
import getCollections from "../../../api/getCollections";
import { useLoaderData } from "react-router-dom";
import styles from "./styles.module.css";

export async function loader() {
  const collections = await getCollections();
  return { collectionsData: collections };
}

export default function CollectionsPage() {
  const loaderData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Layout>
      <h2 className={styles.mainText}>
        Discover our collections for every taste, mood, and celebration!
      </h2>
      <p className={styles.description}>
        We have put together several collections of cocktails that are suitable
        for a special mood or occasion, if you want to experience the classic
        taste of everyone&apos;s favorite drinks or just try something new.
      </p>
      <Collections data={loaderData.collectionsData} />
    </Layout>
  );
}
