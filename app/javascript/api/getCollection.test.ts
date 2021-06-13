import {httpGet} from "../utils/httpClient";
import getCollection, {GetCollectionResponse} from "./getCollection";

jest.mock('../utils/httpClient');

describe('getCollection', () => {
  const getCollectionResponse: GetCollectionResponse = {
    name: 'Collection Name',
    pagy: {count: 1, pages: 1},
    merchants: [{
      id: 3,
      name: 'Test Name 2',
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
    (httpGet as jest.Mock).mockResolvedValue(getCollectionResponse);
  });

  it('calls the correct API endpoint', async () => {
    await getCollection(1, {page: 1});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/collections/1?', {page: 1});

    await getCollection(2, {page: 2});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/collections/2?', {page: 2});
  });
});