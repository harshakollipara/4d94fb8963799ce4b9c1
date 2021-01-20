import axios, {AxiosInstance} from 'axios';
import ConfigManager from './ConfigManager';
import Interceptor from './Interceptor';
import InterceptorParam from './InterceptorParam';

export default class BaseAPIClient {
  private axiosInstance: AxiosInstance;
  private isRequestInterceptorConfigured = false;
  private isResponseInterceptorConfigured = false;
  constructor() {
    this.axiosInstance = axios.create(this.defaultOptions);
    this.setUP();
  }

  private defaultOptions = {
    baseURL: ConfigManager.baseURL(),
    isRetryRequest: false,
  };

  private setUP() {
    this.axiosInstance = axios.create();
  }

  private getInterceptorParam() {
    const param = new InterceptorParam();
    param.axiosInstance = this.getAxios();
    param.getAuthToken = this.getAuthToken;
    param.headers = this.requestHeaders();
    param.shouldFetchAccessToken = this.shouldFetchAccessToken();
    return param;
  }

  private configureInterceptorIfNeeded(param) {
    if (!this.isRequestInterceptorConfigured) {
      this.isRequestInterceptorConfigured = true;
      Interceptor.configureRequestInterceptor(param);
    }
    if (!this.isResponseInterceptorConfigured) {
      this.isResponseInterceptorConfigured = true;
      Interceptor.configureResponseInterceptor(param);
    }
  }

  private configureInterceptor() {
    const param = this.getInterceptorParam();
    this.configureInterceptorIfNeeded(param);
  }

  get(url: string, options = {}): Promise<any> {
    this.configureInterceptor();
    return this.axiosInstance.get(url, {...this.defaultOptions, ...options});
  }

  post(url: string, data: any, options = {}): Promise<any> {
    this.configureInterceptor();
    return this.axiosInstance.post(url, data, {
      ...this.defaultOptions,
      ...options,
    });
  }

  patch(url: string, data: any, options = {}): Promise<any> {
    this.configureInterceptor();
    return this.axiosInstance.patch(url, data, {
      ...this.defaultOptions,
      ...options,
    });
  }

  put(url: string, data: any, options = {}): Promise<any> {
    this.configureInterceptor();
    return this.axiosInstance.put(url, data, {
      ...this.defaultOptions,
      ...options,
    });
  }

  delete(url: string, options = {}): Promise<any> {
    this.configureInterceptor();
    return this.axiosInstance.delete(url, {...this.defaultOptions, ...options});
  }

  private getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  //Should be overided by subclasses.
  getAuthToken(): Promise<void> {
    return Promise.resolve();
  }

  requestHeaders(): any {
    return null;
  }

  shouldFetchAccessToken(): boolean {
    return false;
  }
}
