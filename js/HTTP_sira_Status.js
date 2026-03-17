import { Globals } from "./global.js";
import { PlayerCard } from "./playerCard.js";
import { SongCard } from "./songCard.js";
export class HTTP_sira_Status {
    /////////////////////
    // @CLASS VARIABLE //
    /////////////////////
    _playerCard;
    _songCard;
    constructor() {
        this._playerCard = PlayerCard.Instance;
        this._songCard = SongCard.Instance;
    }
    //////////////////////
    // PRIVATE FUNCTION //
    //////////////////////
    eHandler(dataEvent) {
        switch (dataEvent.event) {
            case "hello":
                console.log("%cBeat Saber " + dataEvent.status.game.gameVersion + " | HTTP(sira)Status " + dataEvent.status.game.pluginVersion, "background-color: green;");
                console.log("\n\n");
                this._songCard.songCardData.started = false;
                this._songCard.songCardData.paused = false;
                this._songCard.songCardData.inProgress = false;
                this._songCard.songCardData.finished = false;
                if (!this._playerCard.playerCardData.disabled) {
                    this._playerCard.playerCardData.needUpdate = true;
                    this._playerCard.playerCardData.display = true;
                }
                if (dataEvent.status.beatmap !== null) {
                    this._songCard.songCardData.started = true;
                    this._songCard.songCardData.finished = false;
                    if (!this._playerCard.playerCardData.disabled) {
                        this._playerCard.playerCardData.display = false;
                    }
                    this.mapInfoParser(dataEvent);
                    if (dataEvent.status.beatmap.paused !== null) {
                        this._songCard.songCardData.paused = true;
                        this._songCard.songCardData.inProgress = false;
                        if (dataEvent.status.beatmap.start !== null)
                            this._songCard.songCardData.time = dataEvent.status.beatmap.paused - dataEvent.status.beatmap.start;
                    }
                    else {
                        this._songCard.songCardData.paused = false;
                        this._songCard.songCardData.inProgress = true;
                        if (dataEvent.status.beatmap.start !== null)
                            this._songCard.songCardData.time = dataEvent.time - dataEvent.status.beatmap.start;
                    }
                    this.scoreParser(dataEvent);
                }
                break;
            case "songStart":
                this._songCard.songCardData.started = true;
                this._songCard.songCardData.paused = false;
                this._songCard.songCardData.inProgress = true;
                this._songCard.songCardData.finished = false;
                if (!this._playerCard.playerCardData.disabled)
                    this._playerCard.playerCardData.display = false;
                this.mapInfoParser(dataEvent);
                break;
            case "pause":
                this._songCard.songCardData.paused = true;
                this._songCard.songCardData.inProgress = false;
                break;
            case "resume":
                this._songCard.songCardData.paused = false;
                this._songCard.songCardData.inProgress = true;
                break;
            case "finished":
                this._songCard.songCardData.finished = true;
                if (!this._playerCard.playerCardData.disabled)
                    this._playerCard.playerCardData.needUpdate = true;
                break;
            case "menu":
                this._songCard.songCardData.started = false;
                this._songCard.songCardData.paused = false;
                this._songCard.songCardData.inProgress = false;
                if (!this._playerCard.playerCardData.disabled)
                    this._playerCard.playerCardData.display = true;
                break;
            case "noteMissed":
            case "scoreChanged":
                this.scoreParser(dataEvent);
                break;
        }
    }
    mapInfoParser(dataEvent) {
        if (dataEvent.status.beatmap?.songCover !== null)
            this._songCard.songCardData.cover = "data:image/png;base64," + dataEvent.status.beatmap?.songCover;
        else
            this._songCard.songCardData.cover = "./pictures/default/notFound.jpg";
        this._songCard.songCardData.title = dataEvent.status.beatmap?.songName;
        this._songCard.songCardData.subTitle = dataEvent.status.beatmap?.songSubName;
        this._songCard.songCardData.mapper = dataEvent.status.beatmap?.levelAuthorName;
        this._songCard.songCardData.author = dataEvent.status.beatmap?.songAuthorName;
        this._songCard.songCardData.bsrKey = "";
        this._songCard.songCardData.bpm = dataEvent.status.beatmap?.songBPM;
        this._songCard.songCardData.difficulty = dataEvent.status.beatmap?.difficulty;
        this._songCard.songCardData.difficultyClass = dataEvent.status.beatmap?.difficultyEnum;
        if (dataEvent.status.beatmap?.start !== null && dataEvent.status.beatmap?.start !== undefined)
            this._songCard.songCardData.time = dataEvent.time - dataEvent.status.beatmap?.start;
        else
            this._songCard.songCardData.time = 0;
        this._songCard.songCardData.totalTime = dataEvent.status.beatmap?.length;
        this._songCard.songCardData.accuracy = 100;
        this._songCard.songCardData.score = "0";
        this._songCard.songCardData.combo = 0;
        this._songCard.songCardData.miss = 0;
        this._songCard.songCardData.speedModifier = 1; // To 1 because the mod calculate the length automatically with the speed
        this._songCard.songCardData.hashMap = dataEvent.status.beatmap?.songHash;
        this._songCard.songCardData.needUpdate = true;
    }
    scoreParser(dataEvent) {
        if (dataEvent.status.performance?.relativeScore !== undefined) // SiraStatus
            this._songCard.songCardData.accuracy = +((dataEvent.status.performance.relativeScore * 100).toFixed(1));
        else // HTTPStatus
            this._songCard.songCardData.accuracy = +(((dataEvent.status.performance?.score * 100) / dataEvent.status.performance?.currentMaxScore).toFixed(1));
        this._songCard.songCardData.score = (dataEvent.status.performance?.score).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this._songCard.songCardData.combo = dataEvent.status.performance?.combo;
        this._songCard.songCardData.miss = dataEvent.status.performance?.missedNotes;
        this._songCard.songCardData.health = 1; // Not implemented
    }
    dataParser(data) {
        let dataParsed = JSON.parse(data);
        this.eHandler(dataParsed);
    }
}
