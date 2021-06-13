import {httpPost} from "../utils/httpClient";
import createCollection, {CreateCollectionResponse} from "./createCollection";

jest.mock('../utils/httpClient');

describe('createCollection', () => {
  const createCollectionResponse: CreateCollectionResponse = {
    id: 2,
    name: 'Collection Name',
  };

  beforeEach(() => {
    (httpPost as jest.Mock).mockResolvedValue(createCollectionResponse);
  });

  it('calls the correct API endpoint', async () => {
    const response = await createCollection({name: 'Collection Name'});
    expect(httpPost).toHaveBeenCalledWith('/api/v1/collections', {name: 'Collection Name'});
    expect(response).toStrictEqual(createCollectionResponse);
  });
});