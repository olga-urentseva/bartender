import { get } from "../lib/http";

type CollectionsResult = {
  id: string;
  collectionName: string;
  description: string;
  imageUrl: string;
}[];

export default async function getCollections() {
  const result = await get<CollectionsResult>(
    "https://cocktails-api.mooo.com/collections"
  );

  return result;
}
