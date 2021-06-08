import {httpGet} from "../utils/httpClient";
import {Merchant} from "../components/MerchantList/MerchantListTable";

export interface GetMerchantsResponse {
  pagy: Record<string, unknown>,
  merchants: Merchant[]
}

const getMerchants = async (queryParams?: { page?: number, name?: string }): Promise<GetMerchantsResponse> => {
  const queryString = new URLSearchParams()
  for (const key in queryParams) {
    queryString.append(key, queryParams[key]);
  }
  return await httpGet(`/api/v1/merchants?${queryString.toString()}`);
};

export default getMerchants;