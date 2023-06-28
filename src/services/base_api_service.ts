import { HttpError, fetchJSON } from '@/utils/fetchers/fetch';
import joinUrl from '@/utils/joinUrl';
import type AlertService from './alert_service';

export type BaseApiServiceArgs = {
  basePath: string;
  serviceName: string;
  apiUrl: string;
  alertService: AlertService;
};

export type ExtendedApiServiceArgs = Omit<
  BaseApiServiceArgs,
  'basePath' | 'serviceName'
>;

export class BaseApiService {
  protected basePath: string;
  protected serviceName: string;
  private apiUrl: string;
  private alertService: AlertService;

  constructor({
    basePath,
    serviceName,
    apiUrl,
    alertService,
  }: BaseApiServiceArgs) {
    this.basePath = basePath;
    this.serviceName = serviceName;
    this.apiUrl = apiUrl;
    this.alertService = alertService;
  }

  protected fetchApi<Data = unknown>({
    path,
    init,
    basePath,
  }: {
    path?: string;
    init?: RequestInit;
    basePath?: string;
  }): Promise<Data> {
    const base = basePath || this.basePath;
    const updatedPath = path
      ? joinUrl(this.apiUrl, base, path)
      : joinUrl(this.apiUrl, base);
    return fetchJSON<Data>(updatedPath, init);
  }

  protected showSuccess(message: string) {
    this.alertService.sendAlert({
      severity: 'success',
      title: `${this.serviceName} Success`,
      message,
    });
  }

  protected showError(message: string) {
    this.alertService.sendAlert({
      severity: 'failure',
      title: `${this.serviceName} Error`,
      message,
    });
  }

  protected getErrorMessage(error: Error) {
    if (error instanceof HttpError) {
      if (
        error?.data &&
        error.response.headers.get('Content-Type')?.includes('json')
      ) {
        const errorData = JSON.parse(error.data);
        const errorMessage = errorData?.message as
          | string
          | string[]
          | undefined;
        if (Array.isArray(errorMessage)) {
          return errorMessage[0];
        } else if (errorMessage === undefined) {
          return errorData?.error;
        }
      }
    }
    return error.message;
  }

  protected showErrorWithMessage(message: string, error: Error) {
    this.showError(message);
    this.alertService.sendAlert({
      severity: 'failure',
      message: `--> ${this.getErrorMessage(error)}`,
    });
  }
}
