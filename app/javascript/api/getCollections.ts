import {httpGet} from "../utils/httpClient";

export interface Collection {
  id: number,
  name: string
}

export interface GetCollectionsResponse {
  pagy: {
    count: number,
    pages: number,
  },
  collections: Collection[]
}

const getCollections = async (queryParams?: { page?: number }): Promise<GetCollectionsResponse> => {
  return await httpGet(`/api/v1/collections?`, queryParams);
};

export default getCollections;