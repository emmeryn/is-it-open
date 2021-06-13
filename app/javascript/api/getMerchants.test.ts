import {httpGet} from "../utils/httpClient";
import getMerchants, {GetMerchantsResponse} from "./getMerchants";

jest.mock('../utils/httpClient');

describe('getMerchants', () => {
  const getMerchantsResponse: GetMerchantsResponse = {
    pagy: {count: 1, pages: 1},
    merchants: [{
      id: 1,
      name: 'Test Name',
      sunday_opens_at: 'test',
      sunday_closes_at: 'test',
      monday_opens_at: 'test',
      monday_closes_at: 'test',
      tuesday_opens_at: 'test',
      tuesday_closes_at: 'test',
      wednesday_opens_at: 'test',
      wednesday_closes_at: 'test',
      thursday_opens_at: 'test',
      thursday_closes_at: 'test',
      friday_opens_at: 'test',
      friday_closes_at: 'test',
      saturday_opens_at: 'test',
      saturday_closes_at: 'test',
    }]
  };

  beforeEach(() => {
    (httpGet as jest.Mock).mockResolvedValue(getMerchantsResponse);
  });

  it('calls the correct API endpoint', async () => {
    await getMerchants({page: 1, name: 'Test'});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/merchants?', {page: 1, name: 'Test'});

    await getMerchants({page: 2, name: 'Name'});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/merchants?', {page: 2, name: 'Name'});
  });
});