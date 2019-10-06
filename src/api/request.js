import axios from 'axios';
import querystring from 'query-string';
import {
    RequestMethod,
    RequestOptions,
    APIUrl,
    ErrorCode
} from './constants';


async function request({ params, method, headers, url, ...otherParams }) {
    const options = {
        ...RequestOptions,
        ...otherParams,
        url: `${APIUrl}${url}`,
        method
    };
    options.headers = {
        'Content-Type': 'Application/json',
        ...headers
    };
    try {
        const response = await axios(options);
        const {status, statusText, headers} = response;
        if (status !== ErrorCode.HttpSuccess) {
            return Promise.reject({
                code: status,
                errorMessage: statusText || headers.status
            });
        }
        return response.data;
    } catch (error) {
        console.log('request failed--:', error);
    };
};

async function serverRequest ({ headers, ...otherParams }) {
    try {
        const response = await request({
            headers: {...headers},
            ...otherParams
        });
        const { success } = response;
        if (!success) {
            //do something for handle error message from server
            // return Promise.reject()
            //handle code, errorMessage here.
        }
        return response;
    } catch (error) {
        //do something for handle error response
        console.log('server request failed--:', error);
        // return Promise.reject(error);
    };
};

function get(options) {
    const { params = {}, url } = options;
    const temp = Object.keys(params).length !== 0 ?
        `${url}?${querystring.stringify(params)}` : url;
    return serverRequest({ ...options, url: temp, method: RequestMethod.get });
};

export {
    get
};
