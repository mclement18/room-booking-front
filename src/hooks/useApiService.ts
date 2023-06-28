import type { ExtendedApiServiceArgs } from '@/services/base_api_service';
import { useApiUrl } from '@/utils/fetchers/fetch_next';
import useAlertContext from './useAlertContext';

export function useApiService<T>(
  ApiServiceClass: new (args: ExtendedApiServiceArgs) => T
) {
  const apiUrl = useApiUrl();
  const { alertService } = useAlertContext();

  return new ApiServiceClass({ apiUrl: apiUrl || '', alertService });
}
