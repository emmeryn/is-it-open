export const httpGet = <ResponseType>(path: string, object?: Record<string, any>): Promise<ResponseType> =>
{
  const queryString = new URLSearchParams()
  for (const key in object) {
    queryString.append(key, object[key]);
  }
  return httpFetch(`${path}${queryString.toString()}`, 'GET');
};

export const httpPost = <ResponseType = void>(path: string, object: unknown): Promise<ResponseType> =>
  httpFetch(path, 'POST', object);

export const httpPut = <ResponseType = void>(path: string, object: unknown): Promise<ResponseType> =>
  httpFetch(path, 'PUT', object);

export const httpDelete = <ResponseType = void>(path: string, object?: unknown): Promise<ResponseType> =>
  httpFetch(path, 'DELETE', object);

const httpFetch = <ResponseType = void>(path: string, method: string, object?: unknown): Promise<ResponseType> =>
  fetch(path, {...requestInit(method), body: JSON.stringify(object)})
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    });

const requestInit = (method: string): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});
