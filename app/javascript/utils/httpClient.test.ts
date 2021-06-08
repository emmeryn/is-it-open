import {httpGet, httpPost, httpPut, httpDelete} from './httpClient';

describe('httpClient', () => {
  type RequestType = { request: string };
  type ResponseType = { response: string };
  const requestBody: RequestType = { request: 'requestValue' };
  const responseBody: ResponseType = { response: 'responseValue' };

  describe.each([
    ['get', () => httpGet<ResponseType>('path'), undefined, undefined],
    ['post', () => httpPost<ResponseType>('path', requestBody), requestBody, responseBody],
    ['put', () => httpPut<ResponseType>('path', requestBody), requestBody, responseBody],
    ['delete', () => httpDelete<ResponseType>('path', requestBody), requestBody, responseBody],
  ])('%s', (method, apiCall: () => Promise<ResponseType>, requestBody, expectedResponseBody) => {
    describe('Response is ok', () => {
      let responseBody: ResponseType;

      beforeEach(async () => {
        const response = {
          ok: true,
          status: 200,
          json: jest.fn().mockResolvedValue(expectedResponseBody),
        } as unknown as Response;
        global.fetch = jest.fn().mockResolvedValue(response);
        responseBody = await apiCall();
      });

      it('calls fetch with path and body', async () => {
        expect((fetch as jest.Mock).mock.calls[0][1]).toStrictEqual({
          method: method.toUpperCase(),
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(requestBody),
        });
      });

      it('returns the response body', async () => {
        expect(responseBody).toStrictEqual(expectedResponseBody);
      });
    });
  });
});
