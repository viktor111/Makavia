class RequestConfig {
    public baseUrl: string = "";

    public getLocalConfig(): RequestConfig {
        let config =  new RequestConfig();
        config.baseUrl = "http://localhost:3000";
        return config;
    }
}

export default RequestConfig;