export async function fetchHTTP(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> {
  const response = await fetch(input, init);

  if (response.ok) return response;

  const data = await response.text();

  throw new HttpError({ message: response.statusText, response, data });
}

export class HttpError extends Error {
  response: Response;
  data: string;

  constructor({
    message,
    response,
    data,
  }: {
    message: string;
    response: Response;
    data?: string;
  }) {
    super(message);

    if (Error.captureStackTrace) Error.captureStackTrace(this, HttpError);

    this.name = 'HttpError';
    this.response = response;
    this.data = data ?? message;
  }
}

export async function fetchJSON<JSON = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<JSON> {
  const response = await fetchHTTP(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const contentType = response.headers.get('Content-Type');
  if (contentType?.includes('json')) {
    return response.json();
  } else {
    const data = await response.text();
    throw new FetchJSONError({ response, contentType, data });
  }
}

export class FetchJSONError extends Error {
  response: Response;
  contentType?: string | null;
  data?: string;

  constructor({
    response,
    contentType,
    data,
  }: {
    response: Response;
    contentType?: string | null;
    data?: string;
  }) {
    super('FetchJSONError: Response Content-Type is not JSON');

    if (Error.captureStackTrace) Error.captureStackTrace(this, FetchJSONError);

    this.name = 'FetchJSONError';
    this.response = response;
    this.contentType = contentType;
    this.data = data;
  }
}

export async function fetchJSONWithHeaders<JSON = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<{ data: JSON; headers: Headers }> {
  const response = await fetchHTTP(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const contentType = response.headers.get('Content-Type');
  if (contentType?.includes('json')) {
    return { data: await response.json(), headers: response.headers };
  } else {
    const data = await response.text();
    throw new FetchJSONError({ response, contentType, data });
  }
}
