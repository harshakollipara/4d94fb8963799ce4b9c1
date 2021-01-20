import InterceptorParam from './InterceptorParam';

export default class Interceptor {
  static configureRequestInterceptor(param: InterceptorParam): void {
    const axios = param.axiosInstance;
    axios.interceptors.request.use(
      function(config: any) {
        const isAuthParamPresent =
          typeof param.headers.Authorization !== 'undefined';
        if (isAuthParamPresent) {
          //We do this when a request is retied because of 401.
          //const token = SessionDataManager.shared.sessionData.accessToken;
          //param.headers.Authorization = `Bearer ${token}`;
        }
        config.headers = {
          ...config.headers,
          ...param.headers,
        };
        config.isRetryRequest = false;
        return config;
      },
      function(error) {
        return Promise.reject(error);
      },
    );
  }

  static configureResponseInterceptor(param: InterceptorParam) {
    const axios = param.axiosInstance;
    axios.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        const error = err.response;
        if (typeof error === 'undefined') {
          return err;
        }
        if (error.status === 403) {
          //this meeans account is locked.
          //ToDo:- Create a custom error and return it.
          return error
        }
        const isNotARetryRequest =
          typeof error.config.isRetryRequest === undefined ||
          error.config.isRetryRequest === false;
        if (error.status === 401 && isNotARetryRequest) {
          if (param.getAuthToken && param.shouldFetchAccessToken === true) {
            error.config.isRetryRequest = true;
            return param
              .getAuthToken()
              .then(() => {
                return axios(error.config);
              })
              .catch(reason => {
                //perform a Logout
              });
          }
        }
        return error;
      },
    );
  }
}
