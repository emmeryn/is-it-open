import {httpGet} from "../utils/httpClient";
import {Merchant} from "./getMerchants";

export interface GetCollectionResponse {
  name: string,
  pagy: {
    count: number,
    pages: number,
  },
  merchants: Merchant[]
}

const getCollection = async (id: number, queryParams?: { page?: number }): Promise<GetCollectionResponse> => {
  return await httpGet(`/api/v1/collections/${id}?`, queryParams);
};

export default getCollection;