import {httpGet} from "../utils/httpClient";
import getCollections, {GetCollectionsResponse} from "./getCollections";

jest.mock('../utils/httpClient');

describe('getCollections', () => {
  const getCollectionsResponse: GetCollectionsResponse = {
    pagy: {count: 1, pages: 1},
    collections: [{
      id: 1,
      name: 'Test Name',
    }]
  };

  beforeEach(() => {
    (httpGet as jest.Mock).mockResolvedValue(getCollectionsResponse);
  });

  it('calls the correct API endpoint', async () => {
    await getCollections({page: 1});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/collections?', {page: 1});

    await getCollections({page: 2});
    expect(httpGet).toHaveBeenCalledWith('/api/v1/collections?', {page: 2});
  });
});