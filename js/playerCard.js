import { Globals } from "./global.js";
import { Template } from "./template.js";
import { ScoreSaber } from "./scoreSaber.js";
export class PlayerCard {
    ///////////////
    // @INSTANCE //
    ///////////////
    static _instance;
    /////////////////////
    // @CLASS VARIABLE //
    /////////////////////
    _template;
    _scoreSaber;
    /////////////////////
    // PUBLIC VARIABLE //
    /////////////////////
    playerCardData = {
        disabled: true,
        display: false,
        alwaysDisplayed: false,
        needUpdate: false,
        position: "top-right",
        skin: "default",
        scale: 1.0,
        playerId: "0",
        avatar: "./pictures/default/notFound.jpg",
        playerFlag: "./pictures/country/FR.svg",
        topWorld: 0,
        topCountry: 0,
        performancePoint: 0
    };
    constructor() {
        this._template = new Template();
        this._scoreSaber = new ScoreSaber();
    }
    //////////////////////
    // PRIVATE FUNCTION //
    //////////////////////
    async updatePlayerInfo() {
        if (this.playerCardData.disabled
            || !this.playerCardData.display
            || !this.playerCardData.needUpdate
            || this.playerCardData.playerId === "0")
            return;
        this.playerCardData.needUpdate = false;
        const data = await this._scoreSaber.getPlayerInfo(this.playerCardData.playerId);
        if (data.errorMessage !== undefined)
            return;
        this.playerCardData.avatar = data.profilePicture;
        this.playerCardData.playerFlag = "./pictures/country/" + data.country + ".svg";
        this.playerCardData.topWorld = data.rank;
        this.playerCardData.topCountry = data.countryRank;
        this.playerCardData.performancePoint = data.pp;
    }
    /////////////////////
    // PUBLIC FUNCTION //
    /////////////////////
    async loadSkin(skinName) {
        if (this.playerCardData.playerId !== "0")
            this.playerCardData.disabled = false;
        if (this.playerCardData.disabled)
            return;
        if (skinName !== undefined)
            await this._template.loadSkin(Globals.E_MODULES.PLAYERCARD, skinName);
    }
    refreshPlayerCard() {
        this.updatePlayerInfo().then(() => {
            this._template.refreshUI(this.playerCardData, Globals.E_MODULES.PLAYERCARD);
            this._template.moduleScale(Globals.E_MODULES.PLAYERCARD, this.playerCardData.position, this.playerCardData.scale);
            this._template.moduleCorners(Globals.E_MODULES.PLAYERCARD, this.playerCardData.position);
        });
    }
    /////////////
    // GETTERS //
    /////////////
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
