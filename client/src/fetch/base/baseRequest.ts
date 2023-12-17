import BaseOptions from "./baseOptions";

class BaseRequest {
    async send<T>(options: BaseOptions) {
        const response = await fetch(options.url, {
            method: options.method,
            body: options.body,
            headers: options.headers
        })

        return await response.json() as T;
    }
}

export default BaseRequest;