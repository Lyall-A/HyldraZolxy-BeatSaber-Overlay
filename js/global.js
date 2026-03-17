export var Globals;
(function (Globals) {
    /////////////////////
    // GLOBAL VARIABLE //
    /////////////////////
    let E_MODULES;
    (function (E_MODULES) {
        E_MODULES["PLAYERCARD"] = "playerCard";
        E_MODULES["SONGCARD"] = "songCard";
        E_MODULES["SETUP"] = "setup";
    })(E_MODULES = Globals.E_MODULES || (Globals.E_MODULES = {}));
    Globals.URI_NAV_SEARCH = window.location.search;
    Globals.SCORESABER_API_URL = "https://proxy.lyall.lol/?url=https://scoresaber.com/api";
    Globals.BEATSAVER_API_URL = "https://api.beatsaver.com";
    Globals.MS_TIMER = 100;
    Globals.DISPLAY_POSITION = [
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right"
    ];
    Globals.SKIN_AVAILABLE = {
        playerCard: {
            default: ["./skins/playerCard/default/", "index.html", "style.css"]
        },
        songCard: {
            default: ["./skins/songCard/default/", "index.html", "style.css"],
            freemium: ["./skins/songCard/freemium/", "index.html", "style.css"],
            reselim: ["./skins/songCard/reselim/", "index.html", "style.css"],
            dietah: ["./skins/songCard/dietah/", "index.html", "style.css"]
        },
        setup: {
            default: ["./skins/setup/default/", "index.html", "general.html", "playerCard.html", "songCard.html", "style.css"]
        }
    };
    ////////////////////////
    // UI GLOBAL VARIABLE //
    ////////////////////////
    Globals.FPS_REFRESH = 1000 / 10;
    /////////////////////////////
    // PLUGINS GLOBAL VARIABLE //
    /////////////////////////////
    let E_WEBSOCKET_STATES;
    (function (E_WEBSOCKET_STATES) {
        E_WEBSOCKET_STATES[E_WEBSOCKET_STATES["CONNECTED"] = 0] = "CONNECTED";
        E_WEBSOCKET_STATES[E_WEBSOCKET_STATES["DISCONNECTED"] = 1] = "DISCONNECTED";
        E_WEBSOCKET_STATES[E_WEBSOCKET_STATES["ERROR"] = 2] = "ERROR";
    })(E_WEBSOCKET_STATES = Globals.E_WEBSOCKET_STATES || (Globals.E_WEBSOCKET_STATES = {}));
    let E_PLUGINS;
    (function (E_PLUGINS) {
        E_PLUGINS["BSPLUS"] = "bsPlus";
        E_PLUGINS["HTTP_sira_STATUS"] = "http_sira_Status";
        E_PLUGINS["DataPuller"] = "dataPuller";
    })(E_PLUGINS = Globals.E_PLUGINS || (Globals.E_PLUGINS = {}));
    Globals.TIMEOUT_MS = 4500;
    Globals.TIME_BEFORE_RETRY = 10000;
    Globals.RETRY_NUMBER = 2;
    Globals.PLUGINS_CONNECTIONS = {
        bsPlus: {
            port: 2947,
            entry: "/socket"
        },
        http_sira_Status: {
            port: 6557,
            entry: "/socket"
        },
        dataPuller: {
            port: 2946,
            entry: "/BSDataPuller/",
            endPoint: {
                mapData: "MapData",
                liveData: "LiveData"
            }
        }
    };
    ///////////////////////////
    // SETUP GLOBAL VARIABLE //
    ///////////////////////////
    let E_SETUP_FILES;
    (function (E_SETUP_FILES) {
        E_SETUP_FILES[E_SETUP_FILES["INDEX"] = 1] = "INDEX";
        E_SETUP_FILES[E_SETUP_FILES["GENERAL"] = 2] = "GENERAL";
        E_SETUP_FILES[E_SETUP_FILES["PLAYER"] = 3] = "PLAYER";
        E_SETUP_FILES[E_SETUP_FILES["SONG"] = 4] = "SONG";
    })(E_SETUP_FILES = Globals.E_SETUP_FILES || (Globals.E_SETUP_FILES = {}));
})(Globals || (Globals = {}));
