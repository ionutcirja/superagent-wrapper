// @flow
import request from 'superagent';

type Headers = {
  [key: string]: any,
};

type Error = {
  [key: string]: any,
};

type Values = {
  [key: string]: any,
};

type Response = {
  text?: string,
  status: number,
};

let apiBaseURL: string = '';
let defaultHeaders: Headers = {
  Accept: 'application/json',
};

const setHeaders = (headers: Headers) => ({
  ...defaultHeaders,
  ...headers,
});

const endCallback = (
  resolve: Function,
  reject: Function,
  error: Error,
  response: Response,
) => {
  try {
    const resObj = response.text ? JSON.parse(response.text) : {};

    if (error) {
      reject({ error: true, data: resObj, status: response.status });
      return;
    }

    resolve(resObj);
  } catch (unknownError) {
    reject({
      error: true,
      data: { message: 'Unknown error' },
      status: response ? response.status : 'unknown',
    });
  }
};

const init = (apiUrl: string, headers: Headers = {}) => {
  apiBaseURL = apiUrl;
  defaultHeaders = {
    ...defaultHeaders,
    ...headers,
  };
};

const send = (
  method: Function,
  endpoint: string,
  values: Values,
  headers: Headers = {},
): Promise<*> => (
  new Promise((resolve, reject) => {
    method(`${apiBaseURL}${endpoint}`)
      .set(setHeaders(headers))
      .send(values)
      .end((error, response) => {
        endCallback(resolve, reject, error, response);
      });
  })
);

const get = (endpoint: string, headers: Headers = {}): Promise<*> => (
  new Promise((resolve, reject) => {
    request
      .get(`${apiBaseURL}${endpoint}`)
      .set(setHeaders(headers))
      .end((error, response) => {
        endCallback(resolve, reject, error, response);
      });
  })
);


const del = (endpoint: string, headers: Headers = {}): Promise<*> => (
  new Promise((resolve, reject) => {
    request
      .del(`${apiBaseURL}${endpoint}`)
      .set(setHeaders(headers))
      .end((error, response) => {
        endCallback(resolve, reject, error, response);
      });
  })
);


const post = (endpoint: string, values: Values, headers: Headers = {}): Promise<*> => (
  send(request.post, endpoint, values, headers)
);

const put = (endpoint: string, values: Values, headers: Headers = {}): Promise<*> => (
  send(request.put, endpoint, values, headers)
);

export default {
  init,
  get,
  post,
  put,
  del,
};
