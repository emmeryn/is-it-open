import {httpGet} from "../utils/httpClient";

export interface Merchant {
  id: number,
  name: string,
  sunday_opens_at: string,
  sunday_closes_at: string,
  monday_opens_at: string,
  monday_closes_at: string,
  tuesday_opens_at: string,
  tuesday_closes_at: string,
  wednesday_opens_at: string,
  wednesday_closes_at: string,
  thursday_opens_at: string,
  thursday_closes_at: string,
  friday_opens_at: string,
  friday_closes_at: string,
  saturday_opens_at: string,
  saturday_closes_at: string,
}

export interface GetMerchantsResponse {
  pagy: {
    count: number,
    pages: number,
  },
  merchants: Merchant[]
}

const getMerchants = async (queryParams?: { page?: number, name?: string }): Promise<GetMerchantsResponse> => {
  return await httpGet(`/api/v1/merchants?`, queryParams);
};

export default getMerchants;