// https://github.com/Swizec/better-fetch/blob/master/src/index.js
// taken from here, i'd use his npm package but plan to make this typescript safe
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

let defaultHeaders = {};

const headerDict = (headers: HeadersInit = {}) => {
    let dict: any = {};

    if (headers instanceof Headers) {
        for (const [key, value] of headers.entries()) {
            dict[key] = value;
        }
    } else {
        dict = headers;
    }

    return dict;
};

export class FetchError extends Error {
    response!: Response;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, FetchError.prototype);
    }
}

/**
 * A fetch wrapper that makes life easier. Yoink will return the `.json()` object and take care of
 * throwing an error if the response comes back with no `.ok` parameter.
 */
export const fetchWrapper = async <T = Record<string, unknown>>(
    url: RequestInfo,
    params: RequestInit = {},
): Promise<T> => {
    params.headers = Object.assign({}, headerDict(params.headers), defaultHeaders);
    params.credentials = 'same-origin';

    if (params.body && typeof params.body !== 'string' && !(params.body instanceof FormData)) {
        const body = new FormData();
        Object.entries(params.body).forEach(([key, value]) => body.append(key, value));
        params.body = body;
    }

    /*
     * Lets be real for a second, we don't really want another format for our data besides JSON,
     * so we are going to go ahead and convert that response body to JSON and you don't have to spam
     * `const data = response.json()` everywhere across your applications.
     */
    const response = await fetch(url, params);
    if (!response.ok) {
        throw new FetchError(response.statusText);
    }

    return await response.json().then((data) => data as T);
};

fetchWrapper.setDefaultHeaders = (headers: any) => {
    defaultHeaders = headerDict(headers);
};

fetchWrapper.throwErrors = (response: Response) => {
    if (!response.ok) {
        const err = new FetchError(response.statusText);
        err.response = response;
        throw err;
    }
    return response;
};
