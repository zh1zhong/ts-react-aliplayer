"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var setIcons_1 = require("../setIcons");
var AliPlayer = /** @class */ (function () {
    function AliPlayer() {
        this.init = function (url, options, events) {
            // const { videoWidth, videoHeight, autoplay = true,  } = options
            var _a = events.ready, ready = _a === void 0 ? function () { } : _a, _b = events.startPlay, startPlay = _b === void 0 ? function () { } : _b, _c = events.pausePlay, pausePlay = _c === void 0 ? function () { } : _c, _d = events.timeUpdate, timeUpdate = _d === void 0 ? function () { } : _d, _e = events.ended, ended = _e === void 0 ? function () { } : _e, _f = events.onError, onError = _f === void 0 ? function () { } : _f, _g = events.onRequestFullscreen, onRequestFullscreen = _g === void 0 ? function () { } : _g, _h = events.onCancelFullscreen, onCancelFullscreen = _h === void 0 ? function () { } : _h, _j = events.getLastTime, getLastTime = _j === void 0 ? function () { } : _j;
            return window.Aliplayer(__assign(__assign({ id: 'player-con', 
                // 播放方式一：支持播放地址播放，此播放方式优先级最高
                source: url }, options), { components: [
                    {
                        name: 'MemoryPlayComponent',
                        type: window.AliPlayerComponent.MemoryPlayComponent,
                        args: [false, getLastTime]
                    },
                    {
                        name: 'RateComponent',
                        type: window.AliPlayerComponent.RateComponent
                    },
                    {
                        name: 'QualityComponent',
                        type: window.AliPlayerComponent.QualityComponent
                    },
                    {
                        name: 'SetIcons',
                        type: setIcons_1["default"]
                    },
                ], skinLayout: [
                    { name: 'bigPlayButton', align: 'cc' },
                    { name: 'H5Loading', align: 'cc' },
                    { name: 'errorDisplay', align: 'tlabs', x: 0, y: 0 },
                    { name: 'infoDisplay' },
                    { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
                    { name: 'thumbnail' },
                    {
                        name: 'controlBar',
                        align: 'blabs',
                        children: [
                            { name: 'progress', align: 'blabs', x: 0, y: 44 },
                            { name: 'playButton', align: 'tl', x: 20, y: 17 },
                            { name: 'timeDisplay', align: 'tl', x: 45, y: 7 },
                            { name: 'fullScreenButton', align: 'tr', x: 20, y: 15 },
                            { name: 'volume', align: 'tr', x: 38, y: 15 },
                        ]
                    },
                ] }), function (player) {
                player.on('ready', function () { return ready(player); });
                // player.on('waiting', () => ready(player))
                player.on('play', function () { return startPlay(player); });
                player.on('pause', function () { return pausePlay(player); });
                player.on('timeUpdate', function () { return timeUpdate(player); }); // 无效？
                player.on('ended', function () { return ended(player); });
                player.on('error', function () { return onError(player); });
                player.on('requestFullScreen', function () { return onRequestFullscreen(player); });
                player.on('cancelFullScreen', function () { return onCancelFullscreen(player); });
                // player.on('sourceloaded', () => {})
            });
        };
    }
    return AliPlayer;
}());
exports["default"] = AliPlayer;
