import {httpPut} from "../utils/httpClient";

export interface UpdateCollectionResponse {
  id: number,
  name: string
}

const updateCollection = async (id: number, createParams: {name?: string, merchant_ids: number[]}): Promise<UpdateCollectionResponse> => {
  return await httpPut(`/api/v1/collections/${id}`, {collection: createParams});
};

export default updateCollection;