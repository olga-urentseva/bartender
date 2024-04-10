import { get } from "../lib/http";

type CollectionInfoResult = {
  id: string;
  collectionName: string;
  description: string;
  imageUrl: string;
};

export default async function getCollectionInfoById(id: string) {
  const url = "https://cocktails-api.mooo.com/collections/";
  const result = await get<CollectionInfoResult>(url + id);

  return result;
}
