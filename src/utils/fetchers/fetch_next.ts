import useSWR from 'swr';
import { fetchJSON } from './fetch';

export function useApiUrl() {
  const { data } = useSWR<{ apiUrl: string }>('/api/backendURL', fetchJSON, {
    errorRetryCount: 1,
  });

  return data?.apiUrl;
}
