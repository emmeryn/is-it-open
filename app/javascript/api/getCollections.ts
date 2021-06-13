import {httpGet} from "../utils/httpClient";

export interface Collection {
  id: number,
  name: string
}

const getCollections = async (): Promise<Collection[]> => {
  return await httpGet(`/api/v1/collections`);
};

export default getCollections;