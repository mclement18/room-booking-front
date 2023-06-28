import useSWR from 'swr';
import { fetchJSON } from './fetch';

export function useApiUrl() {
  const { data } = useSWR<{ apiUrl: string }>('/api/backendUrl', fetchJSON, {
    errorRetryCount: 1,
  });

  return data?.apiUrl;
}
