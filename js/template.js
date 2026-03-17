import { Globals } from "./global.js";
export class Template {
    /////////////////////
    // PUBLIC FUNCTION //
    /////////////////////
    loadSkin(moduleName, skinName, fileName) {
        return new Promise(resolve => {
            let skin = (Globals.SKIN_AVAILABLE[moduleName].hasOwnProperty(skinName) ? Globals.SKIN_AVAILABLE[moduleName][skinName] : Globals.SKIN_AVAILABLE[moduleName]["default"]);
            let skinPath = skin[0];
            $("link[rel=stylesheet][href*=\"./skins/" + moduleName + "\"]").remove();
            if (fileName !== undefined) {
                if (skin.includes(fileName)) {
                    for (let i = 1; i < skin.length; i++) {
                        if (skin[i] === "style.css") {
                            $("head").append("<link rel=\"stylesheet\" href=\"" + skinPath + skin[i] + "\" type=\"text/css\" />");
                            continue;
                        }
                    }
                    $("#" + moduleName).load(skinPath + fileName);
                }
            }
            else {
                for (let i = 1; i < skin.length; i++) {
                    if (skin[i] === "style.css") {
                        $("head").append("<link rel=\"stylesheet\" href=\"" + skinPath + skin[i] + "\" type=\"text/css\" />");
                        continue;
                    }
                    $("#" + moduleName).load(skinPath + skin[i]);
                }
            }
            setTimeout(() => resolve(""), 0);
        });
    }
    refreshUI(data, moduleName) {
        for (let [key, value] of Object.entries(data)) {
            switch (moduleName) {
                case Globals.E_MODULES.PLAYERCARD:
                    switch (key) {
                        case "topCountry":
                        case "topWorld":
                        case "performancePoint":
                            $("#" + key).text(value);
                            break;
                        case "playerFlag":
                        case "avatar":
                            $("#" + key).css("background-image", "url('" + value + "')");
                            break;
                    }
                    break;
                case Globals.E_MODULES.SONGCARD:
                    switch (key) {
                        case "title":
                        case "subTitle":
                        case "mapper":
                        case "author":
                        case "difficulty":
                        case "bsrKey":
                        case "bpm":
                        case "timeToLetters":
                        case "totalTimeToLetters":
                        case "accuracy":
                        case "accuracyToLetters":
                        case "score":
                        case "combo":
                        case "miss":
                            $("#" + key).text(value);
                            break;
                        case "cover":
                            $("#" + key).css("background-image", "url('" + value + "')");
                            break;
                        case "qualified":
                        case "ranked":
                            $("#" + key).css("display", (value) ? "inline-block" : "none");
                            break;
                        case "accuracyToLetterClass":
                            $("." + key).removeClass("ss s a b c de").addClass(value);
                            break;
                        case "difficultyClass":
                            $("." + key).removeClass("ExpertPlus Expert Hard Normal Easy").addClass(value);
                            break;
                        case "health":
                        case "timeToPercentage":
                            $("#" + key).css("width", value + "%");
                            break;
                    }
                    break;
            }
        }
    }
    moduleScale(moduleName, position, scale) {
        let element = $("#playerCard");
        if (moduleName === Globals.E_MODULES.SONGCARD)
            element = $("#songCard");
        element.css("transform-origin", position.replace(/(-)/g, " "));
        element.css("transform", "scale(" + scale + ")");
    }
    moduleCorners(moduleName, position) {
        let element = $("#playerCard");
        if (moduleName === Globals.E_MODULES.SONGCARD)
            element = $("#songCard");
        element.removeClass("top-left bottom-left top-right bottom-right");
        element.addClass(position);
    }
    moduleToggleDisplay(playerCardData, songCardData) {
        if (playerCardData.disabled)
            $("#playerCard").addClass("hidden");
        if (songCardData.disabled)
            $("#songCard").addClass("hidden");
        if (!songCardData.started)
            $("#songCard").addClass("hidden");
        if (songCardData.started)
            $("#songCard").removeClass("hidden");
        if (!playerCardData.display)
            $("#playerCard").addClass("hidden");
        if (playerCardData.display)
            $("#playerCard").removeClass("hidden");
    }
    stopOrStart(started, paused) {
        $("#songCard").removeClass("stop");
        if (!started || paused)
            $("#songCard").addClass("stop");
    }
    missDisplay(display) {
        if (display)
            $(".missGroup").css("display", "block");
        else
            $(".missGroup").css("display", "none");
    }
    /////////////////////////////
    // PUBLIC PLUGINS FUNCTION //
    /////////////////////////////
    timerToCircleBar(percentage) {
        const circumference = 30 * Math.PI * 2;
        $("#progress").css("stroke-dashoffset", ((1 - (percentage / 100)) * circumference) + "px");
    }
    missChanger(missNumber) {
        if (missNumber === 0) {
            $("#miss").removeClass("ion-android-checkmark-circle ion-android-cancel");
            $("#miss").addClass("ion-android-checkmark-circle");
            $("#miss").text("FC");
        }
        else {
            $("#miss").removeClass("ion-android-checkmark-circle ion-android-cancel");
            $("#miss").addClass("ion-android-cancel");
        }
    }
    ///////////////////////////
    // PUBLIC SETUP FUNCTION //
    ///////////////////////////
    setupHide(display) {
        if (display)
            $("#setupPanel").addClass("hidden");
        else
            $("#setupPanel").removeClass("hidden");
    }
    makeActive(element) {
        $("li").removeClass("active");
        if (element !== undefined)
            element.addClass("active");
    }
    makeHidden(displayed) {
        if (!displayed)
            $("#setup").removeClass("hidden");
        else
            $("#setup").addClass("hidden");
    }
}
