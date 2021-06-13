import {httpPut} from "../utils/httpClient";
import updateCollection, {UpdateCollectionResponse} from "./updateCollection";

jest.mock('../utils/httpClient');

describe('updateCollection', () => {
  const updateCollectionResponse: UpdateCollectionResponse = {
    id: 2,
    name: 'Collection Name',
  };

  beforeEach(() => {
    (httpPut as jest.Mock).mockResolvedValue(updateCollectionResponse);
  });

  it('calls the correct API endpoint', async () => {
    const response = await updateCollection(2, {name: 'Collection Name', merchant_ids: [3]});
    expect(httpPut).toHaveBeenCalledWith('/api/v1/collections/2', {collection: {name: 'Collection Name', merchant_ids: [3]}});
    expect(response).toStrictEqual(updateCollectionResponse);
  });
});