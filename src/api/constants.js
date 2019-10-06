
const APIUrl = 'https://randomuser.me';
const RequestMethod = {
    get: 'get',
};
const ErrorCode = {
    HttpSuccess: 200,
    Unknown: -1,
    Timeout: 408,
    BadGateway: 502,
    BadRequest: 400,
};
const RequestTimeout = 30000;
const RequestOptions = { timeout: RequestTimeout };

export {
    APIUrl,
    RequestMethod,
    RequestOptions,
    ErrorCode
};
