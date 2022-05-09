"use strict";
exports.__esModule = true;
var SetIcons = /** @class */ (function () {
    function SetIcons() {
        this.pause = function (player, e) {
            console.log('pause');
        };
        this.fullScreenBtn = null;
    }
    SetIcons.prototype.createEl = function (el) {
        console.log('createEl');
        this.fullScreenBtn = document.getElementsByClassName('prism-fullscreen-btn')[0];
        // this.fullScreenBtn.style
    };
    SetIcons.prototype.ready = function (player, e) {
        console.log('ready');
    };
    SetIcons.prototype.play = function (player, e) {
        console.log('play');
    };
    return SetIcons;
}());
exports["default"] = SetIcons;
