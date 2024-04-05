import { get } from "../lib/http";

type CollectionsResult = {
  id: string;
  collectionName: string;
  description: string;
  imageUrl: string;
};

export default async function getCollections(ids: string[] | [] | undefined) {
  if (!ids || ids.length === 0) {
    return [];
  }

  const url = `https://cocktails-api.mooo.com/collections/`;

  const promises = ids.map(async (id) => {
    return get<CollectionsResult>(url + id);
  });

  const result = await Promise.all(promises);

  console.log(result);
  return result;
}
