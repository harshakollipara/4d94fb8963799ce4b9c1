import {AxiosInstance} from 'axios';

export type AuthTokenCallBack = () => Promise<void>;

export default class InterceptorParam {
  axiosInstance: AxiosInstance | undefined;
  headers: any = null;
  shouldFetchAccessToken: boolean = false;
  getAuthToken: AuthTokenCallBack | undefined;
}
