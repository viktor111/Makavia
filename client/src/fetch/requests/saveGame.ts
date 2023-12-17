import BaseOptions from "../base/baseOptions";
import BaseRequest from "../base/baseRequest";
import HttpMethod from "../base/methodsEnum";
import RequestConfig from "../config";
import SaveGameRequest from "../dtos/saveGameRequest";
import SaveGameResponse from "../dtos/saveGameResponse";

class SaveGameHttp {
    public async saveGame(request: SaveGameRequest): Promise<SaveGameResponse> {
        const config = new RequestConfig().getLocalConfig();

        const url = new URL(`${config.baseUrl}/saveGame`);
        const body = JSON.stringify(request);
        const method = HttpMethod.POST;

        const options = new BaseOptions()
        .setDefaultHeaders()
        .setMethod(method)
        .setUrl(url)
        .setBody(body);

        const fetch = new BaseRequest();

        return await fetch.send<SaveGameResponse>(options);
    }
}