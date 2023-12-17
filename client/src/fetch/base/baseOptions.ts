import HttpHeaders from "./httpHeaders";
import HttpMethod from "./methodsEnum";

class BaseOptions {
    public method: HttpMethod = HttpMethod.GET;
    public url: URL = new URL('');
    public body: any;
    public headers: HttpHeaders = {};

    public setMethod(method: HttpMethod): BaseOptions {
        this.method = method;
        return this;
    }

    public setUrl(url: URL): BaseOptions {
        this.url = url;
        return this;
    }

    public setBody(body: any): BaseOptions {
        this.body = body;
        return this;
    }

    public setHeaders(headers: HttpHeaders): BaseOptions {
        this.headers = headers;
        return this;
    }

    public getMethod(): string {
        return this.method;
    }

    public getUrl(): URL {
        return this.url;
    }

    public getBody(): any {
        return this.body;
    }

    public getHeaders(): HttpHeaders {
        return this.headers;
    }

    public setDefaultHeaders(): BaseOptions{
        this.headers = {
            "Content-Type": "application/json"
        }

        return this;
    }
}

export default BaseOptions;