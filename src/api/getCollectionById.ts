import { get } from "../lib/http";

type CollectionInfoResult = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
};

export default async function getCollectionInfoById(id: string) {
  const url = "https://bartender-api.mooo.com/collections/";
  const result = await get<CollectionInfoResult>(url + id);

  return result;
}
