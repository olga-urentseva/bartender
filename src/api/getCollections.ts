import { get } from "../lib/http";

type CollectionsResult = {
  id: string;
  name: string;
  description: string;
  pictureURL: string;
}[];

export default async function getCollections() {
  const result = await get<CollectionsResult>(
    "https://bartender-api.mooo.com/collections",
  );

  return result;
}
