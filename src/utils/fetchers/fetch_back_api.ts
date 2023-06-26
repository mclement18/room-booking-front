import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import { fetchJSON, fetchJSONWithHeaders } from './fetch';
import joinUrl from '../joinUrl';
import { useApiUrl } from './fetch_next';

export async function fetchBackApi<Data = unknown>(
  path: string,
  init?: RequestInit
) {
  return fetchJSON<Data>(joinUrl(process.env.API_URL as string, path), init);
}

export async function fetchBackApiWithHeaders<Data = unknown>(
  path: string,
  init?: RequestInit
) {
  return fetchJSONWithHeaders<Data>(
    joinUrl(process.env.API_URL as string, path),
    init
  );
}

export type BackendOptions =
  | { from: Date; to: Date }
  | { from: undefined; to: undefined };

export function useBackendApi<Data = unknown>(
  path: string | null,
  apiOptions?: BackendOptions,
  config?: SWRConfiguration<Data>
) {
  const apiUrl = useApiUrl();

  const url =
    apiUrl === undefined
      ? null
      : path === null
      ? path
      : apiOptions?.from
      ? `${joinUrl(apiUrl, path)}?from=${apiOptions.from}&to=${apiOptions.to}`
      : joinUrl(apiUrl, path);

  return useSWR<Data>(url, fetchJSON, config);
}
