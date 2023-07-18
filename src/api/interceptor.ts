import {normalizeJsonApiIfNeed} from './utils/common';
import {AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

// TODO: testing refresh token
// let shouldRefresh = true;
// let interval = setInterval(() => {
//   shouldRefresh = !shouldRefresh;
//   console.log('shouldRefresh', shouldRefresh);
// }, 10000);

export const responseInterceptor = (response: AxiosResponse) => {
  // TODO: testing
  // if (response?.request?.responseURL?.includes('refresh_token')) {
  //   shouldRefresh = false;
  //   console.log('response refresh_token', response);
  // }
  // if (shouldRefresh) {
  //   throw {
  //     error: 'mocking test refreshtoken',
  //     status: 401,
  //     serverStatus: 401,
  //   };
  // }

  console.log(
    'Response from API: ',
    response?.request?.responseURL,
    response?.status,
  );

  if (response.status >= 400) {
    console.log('Response from API error: ', response?.data);
    // need to show message from server
    const errorObject = normalizeJsonApiIfNeed(response?.data ?? response);
    if (response.status === 404) {
      // not found => show customize message instead
    }

    const customError = {
      serverStatus: response.status.toString(),
      ...errorObject,
    };
    return Promise.reject(customError);
    /**
     * {
     * "data": null,
     * "errorCode": "SHARE_COMMON.SYSTEM_ERROR",
     * "message": ["Connection reset by peer; nested exception is java.lang.RuntimeException: Connection reset by peer"],
     * "refCode": null,
     * "status": 500,
     *
     * "statusCode": "500",
     * "success": false,
     * "violations": null
     * }
     */
    // Ignore system Error if needed
    /**
    const SYSTEM_ERROR = ['SYSTEM_ERROR'];
    if (
      response?.status >= 500 ||
      SYSTEM_ERROR.filter(
        systemError =>
          response?.data?.errorCode?.length &&
          response?.data?.errorCode.includes(systemError),
      ).length
    ) {
      let messageStr = '';
      if (response?.data?.message?.length) {
        messageStr = response?.data?.message.reduce(
          (str: string, nextError: any) => {
            return str + `${nextError}` + '\n';
          },
        );
      }

      // const IGNORE_MSG = ['java', 'runtimeException', 'Connection reset by peer'];
      const IGNORE_MSG = ['Connection reset by peer'];
      const shouldIgnore = IGNORE_MSG.filter(ignoreMsg =>
        messageStr.toLowerCase().includes(ignoreMsg.toLowerCase()),
      );
      if (shouldIgnore?.length) {
        return Promise.reject(new Error('IGNORE'));
      }
    } */
  }

  const dataObject = {
    ...response?.data,
  };

  const ignoreResponseFromUrl = ['s3_asigned'];
  const requestUrl = response?.request?.responseURL;
  const shouldIgnore = ignoreResponseFromUrl.reduce(
    (rs, next) => requestUrl.includes(next) || rs,
    false,
  );
  // https://github.com/yury-dymov/json-api-normalizer/issues/71
  let normalizeData;
  if (shouldIgnore) {
    normalizeData = response?.data;
  } else {
    normalizeData = normalizeJsonApiIfNeed(dataObject);
  }
  console.log('Response from API data: ', response?.data);

  return Promise.resolve(response?.data);
};

export const errorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

export const requestInterceptor = (config: AxiosRequestConfig) => {
  console.log(
    'REQUEST: ',
    config?.method?.toUpperCase(),
    (config?.baseURL ?? '') + config?.url,
    config?.data,
  );
  return config;
};
