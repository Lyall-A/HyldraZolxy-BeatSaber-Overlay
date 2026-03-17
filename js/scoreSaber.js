import { Globals } from "./global.js";
import { Tools } from "./tools.js";
export class ScoreSaber {
    /////////////////////
    // @CLASS VARIABLE //
    /////////////////////
    _tools;
    constructor() {
        this._tools = new Tools();
    }
    /////////////////////
    // PUBLIC FUNCTION //
    /////////////////////
    async getPlayerInfo(playerId) {
        return await this._tools.getMethod(Globals.SCORESABER_API_PROXY_URL + "/?playerId=" + playerId);
    }
}
