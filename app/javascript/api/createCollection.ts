import {httpPost} from "../utils/httpClient";

export interface CreateCollectionResponse {
  id: number,
  name: string
}

const createCollection = async (createParams: {name: string}): Promise<CreateCollectionResponse> => {
  return await httpPost(`/api/v1/collections`, createParams);
};

export default createCollection;