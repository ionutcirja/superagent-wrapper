import request from 'superagent';

let apiBaseURL = '';
let defaultHeaders = {
    Accept: 'application/json',
};

const setHeaders = headers => Object.assign({}, defaultHeaders, headers);

const endCallback = (resolve, reject, error, response) => {
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
            status: response ? response.status : 500,
        });
    }
};

const init = (apiUrl, headers = {}) => {
    apiBaseURL = apiUrl;
    defaultHeaders = Object.assign({}, defaultHeaders, headers);
};

const send = (method, endpoint, values, headers = {}) =>
    new Promise((resolve, reject) => {
        method(`${apiBaseURL}${endpoint}`)
            .set(setHeaders(headers))
            .send(values)
            .end((error, response) => {
                endCallback(resolve, reject, error, response);
            });
    });

const get = (endpoint, headers = {}) =>
    new Promise((resolve, reject) => {
        request
            .get(`${apiBaseURL}${endpoint}`)
            .set(setHeaders(headers))
            .end((error, response) => {
                endCallback(resolve, reject, error, response);
            });
    });

const del = (endpoint, headers = {}) =>
    new Promise((resolve, reject) => {
        request
            .del(`${apiBaseURL}${endpoint}`)
            .set(setHeaders(headers))
            .end((error, response) => {
                endCallback(resolve, reject, error, response);
            });
    });

const post = (endpoint, values, headers = {}) =>
    send(request.post, endpoint, values, headers);

const put = (endpoint, values, headers = {}) =>
    send(request.put, endpoint, values, headers);

export default {
    init,
    get,
    post,
    put,
    del,
};
