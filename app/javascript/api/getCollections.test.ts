import {httpGet} from "../utils/httpClient";
import getCollections, {Collection} from "./getCollections";

jest.mock('../utils/httpClient');

describe('getCollections', () => {
  const getCollectionsResponse: Collection[] = [{
    id: 1,
    name: 'Test Name',
  }];

  beforeEach(() => {
    (httpGet as jest.Mock).mockResolvedValue(getCollectionsResponse);
  });

  it('calls the correct API endpoint', async () => {
    await getCollections();
    expect(httpGet).toHaveBeenCalledWith('/api/v1/collections');
  });
});