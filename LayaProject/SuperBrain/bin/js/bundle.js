var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
const CreateQuestionMap_1 = require("./scripts/CreateQuestionMap");
/*
* 游戏初始化配置;
*/
class GameConfig {
    constructor() { }
    static init() {
        var reg = Laya.ClassUtils.regClass;
        reg("scripts/CreateQuestionMap.ts", CreateQuestionMap_1.default);
    }
}
GameConfig.width = 1920;
GameConfig.height = 1080;
GameConfig.scaleMode = "fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "middle";
GameConfig.alignH = "center";
GameConfig.startScene = "SetQuestionWindow.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;
exports.default = GameConfig;
GameConfig.init();
},{"./scripts/CreateQuestionMap":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConfig_1 = require("./GameConfig");
class Main {
    constructor() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        // Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    onVersionLoaded() {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }
    onConfigLoaded() {
        //加载IDE指定的场景
        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
    }
}
//激活启动类
new Main();
},{"./GameConfig":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateQuestionMap extends Laya.Script {
    constructor() {
        super();
        this.questionItem = null;
        /**
         * @prop {name:questionItem,tips:预制体,type:Prefab,default:null}
         */
        this.questionItem = null;
    }
    onAwake() {
        super.onAwake();
        this.createMap(4);
    }
    createMap(circleCount) {
        let centerX = Laya.stage.width / 2 - 74 / 2;
        let centerY = Laya.stage.height / 2 - 64 / 2;
        //生成中心块
        let centerItem = this.questionItem.create();
        centerItem.pos(centerX, centerY);
        this.owner.addChild(centerItem);
        //生成外圈块
        for (let i = 1; i <= circleCount; i++) {
            let sideCount = i + 1;
            // 先创建两边的块
            for (let j = 0; j < sideCount; j++) {
                let leftOffsetX = centerX - i * 55;
                let rightOffsetX = centerX + i * 55;
                let offsetY = centerY - 32 * i + j * 64;
                let leftItem = this.questionItem.create();
                let rightItem = this.questionItem.create();
                leftItem.pos(leftOffsetX, offsetY);
                this.owner.addChild(leftItem);
                rightItem.pos(rightOffsetX, offsetY);
                this.owner.addChild(rightItem);
            }
            //创建上面和下面的块
            let topItem = this.questionItem.create();
            let bottomItem = this.questionItem.create();
            topItem.pos(centerX, centerY - 64 * i);
            bottomItem.pos(centerX, centerY + 64 * i);
            this.owner.addChild(topItem);
            this.owner.addChild(bottomItem);
        }
    }
}
exports.default = CreateQuestionMap;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREUyLjAuMi9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9NYWluLnRzIiwic3JjL3NjcmlwdHMvQ3JlYXRlUXVlc3Rpb25NYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsZ0dBQWdHO0FBQ2hHLG1FQUEyRDtBQUMzRDs7RUFFRTtBQUNGO0lBYUksZ0JBQWMsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJO1FBQ1AsSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsR0FBRyxDQUFDLDhCQUE4QixFQUFDLDJCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQzs7QUFoQk0sZ0JBQUssR0FBUSxJQUFJLENBQUM7QUFDbEIsaUJBQU0sR0FBUSxJQUFJLENBQUM7QUFDbkIsb0JBQVMsR0FBUSxZQUFZLENBQUM7QUFDOUIscUJBQVUsR0FBUSxNQUFNLENBQUM7QUFDekIsaUJBQU0sR0FBUSxRQUFRLENBQUM7QUFDdkIsaUJBQU0sR0FBUSxRQUFRLENBQUM7QUFDdkIscUJBQVUsR0FBSyx5QkFBeUIsQ0FBQztBQUN6QyxvQkFBUyxHQUFRLEVBQUUsQ0FBQztBQUNwQixnQkFBSyxHQUFTLEtBQUssQ0FBQztBQUNwQixlQUFJLEdBQVMsS0FBSyxDQUFDO0FBQ25CLHVCQUFZLEdBQVMsS0FBSyxDQUFDO0FBQzNCLDRCQUFpQixHQUFTLElBQUksQ0FBQztBQVoxQyw2QkFrQkM7QUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUN4QmxCLDZDQUFzQztBQUN0QztJQUNDO1FBQ0MsZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JB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QyxPQUFPLEVBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxPQUFPLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBRW5DO0lBQ0wsQ0FBQztDQTRCSjtBQTdFRCxvQ0E2RUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBDcmVhdGVRdWVzdGlvbk1hcCBmcm9tIFwiLi9zY3JpcHRzL0NyZWF0ZVF1ZXN0aW9uTWFwXCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTE5MjA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMDgwO1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cIm1pZGRsZVwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJjZW50ZXJcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIlNldFF1ZXN0aW9uV2luZG93LnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHRzL0NyZWF0ZVF1ZXN0aW9uTWFwLnRzXCIsQ3JlYXRlUXVlc3Rpb25NYXApO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuY2xhc3MgTWFpbiB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvL+WFvOWuueW+ruS/oeS4jeaUr+aMgeWKoOi9vXNjZW5l5ZCO57yA5Zy65pmvXHJcblx0XHRMYXlhLlVSTC5leHBvcnRTY2VuZVRvSnNvbiA9IEdhbWVDb25maWcuZXhwb3J0U2NlbmVUb0pzb247XHJcblxyXG5cdFx0Ly/miZPlvIDosIPor5XpnaLmnb/vvIjpgJrov4dJREXorr7nva7osIPor5XmqKHlvI/vvIzmiJbogIV1cmzlnLDlnYDlop7liqBkZWJ1Zz10cnVl5Y+C5pWw77yM5Z2H5Y+v5omT5byA6LCD6K+V6Z2i5p2/77yJXHJcblx0XHRpZiAoR2FtZUNvbmZpZy5kZWJ1ZyB8fCBMYXlhLlV0aWxzLmdldFF1ZXJ5U3RyaW5nKFwiZGVidWdcIikgPT0gXCJ0cnVlXCIpIExheWEuZW5hYmxlRGVidWdQYW5lbCgpO1xyXG5cdFx0aWYgKEdhbWVDb25maWcucGh5c2ljc0RlYnVnICYmIExheWFbXCJQaHlzaWNzRGVidWdEcmF3XCJdKSBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXS5lbmFibGUoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnN0YXQpIExheWEuU3RhdC5zaG93KCk7XHJcblx0XHQvLyBMYXlhLmFsZXJ0R2xvYmFsRXJyb3IgPSB0cnVlO1xyXG5cclxuXHRcdC8v5r+A5rS76LWE5rqQ54mI5pys5o6n5Yi277yMdmVyc2lvbi5qc29u55SxSURF5Y+R5biD5Yqf6IO96Ieq5Yqo55Sf5oiQ77yM5aaC5p6c5rKh5pyJ5Lmf5LiN5b2x5ZON5ZCO57ut5rWB56iLXHJcblx0XHRMYXlhLlJlc291cmNlVmVyc2lvbi5lbmFibGUoXCJ2ZXJzaW9uLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uVmVyc2lvbkxvYWRlZCksIExheWEuUmVzb3VyY2VWZXJzaW9uLkZJTEVOQU1FX1ZFUlNJT04pO1xyXG5cdH1cclxuXHJcblx0b25WZXJzaW9uTG9hZGVkKCk6IHZvaWQge1xyXG5cdFx0Ly/mv4DmtLvlpKflsI/lm77mmKDlsITvvIzliqDovb3lsI/lm77nmoTml7blgJnvvIzlpoLmnpzlj5HnjrDlsI/lm77lnKjlpKflm77lkIjpm4bph4zpnaLvvIzliJnkvJjlhYjliqDovb3lpKflm77lkIjpm4bvvIzogIzkuI3mmK/lsI/lm75cclxuXHRcdExheWEuQXRsYXNJbmZvTWFuYWdlci5lbmFibGUoXCJmaWxlY29uZmlnLmpzb25cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29uZmlnTG9hZGVkKSk7XHJcblx0fVxyXG5cclxuXHRvbkNvbmZpZ0xvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5Yqg6L29SURF5oyH5a6a55qE5Zy65pmvXHJcblx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSk7XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENyZWF0ZVF1ZXN0aW9uTWFwIGV4dGVuZHMgTGF5YS5TY3JpcHR7XHJcbiAgIFxyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbkl0ZW06TGF5YS5QcmVmYWIgPSBudWxsO1xyXG4gICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcCB7bmFtZTpxdWVzdGlvbkl0ZW0sdGlwczrpooTliLbkvZMsdHlwZTpQcmVmYWIsZGVmYXVsdDpudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25JdGVtID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCl7XHJcbiAgICAgICAgc3VwZXIub25Bd2FrZSgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKDQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTWFwKGNpcmNsZUNvdW50Om51bWJlcikge1xyXG4gICAgICAgIGxldCBjZW50ZXJYID0gTGF5YS5zdGFnZS53aWR0aCAvIDIgLSA3NCAvIDI7XHJcbiAgICAgICAgbGV0IGNlbnRlclkgPSBMYXlhLnN0YWdlLmhlaWdodCAvIDIgLSA2NCAvIDI7XHJcbiAgICAgICAgLy/nlJ/miJDkuK3lv4PlnZdcclxuICAgICAgICBsZXQgY2VudGVySXRlbSA9IHRoaXMucXVlc3Rpb25JdGVtLmNyZWF0ZSgpO1xyXG4gICAgICAgIGNlbnRlckl0ZW0ucG9zKGNlbnRlclgsY2VudGVyWSk7XHJcbiAgICAgICAgdGhpcy5vd25lci5hZGRDaGlsZChjZW50ZXJJdGVtKTtcclxuXHJcbiAgICAgICAgLy/nlJ/miJDlpJblnIjlnZdcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2kgPD0gY2lyY2xlQ291bnQ7aSsrKXtcclxuICAgICAgICAgICAgbGV0IHNpZGVDb3VudCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAvLyDlhYjliJvlu7rkuKTovrnnmoTlnZdcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgc2lkZUNvdW50O2orKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdE9mZnNldFggPSBjZW50ZXJYIC0gaSAqIDU1O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0T2Zmc2V0WCA9IGNlbnRlclggKyBpICogNTU7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IGNlbnRlclkgLSAzMiAqIGkgKyBqICogNjQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVmdEl0ZW0gPSB0aGlzLnF1ZXN0aW9uSXRlbS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGxldCByaWdodEl0ZW0gPSB0aGlzLnF1ZXN0aW9uSXRlbS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgICAgIGxlZnRJdGVtLnBvcyhsZWZ0T2Zmc2V0WCxvZmZzZXRZKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3duZXIuYWRkQ2hpbGQobGVmdEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRJdGVtLnBvcyhyaWdodE9mZnNldFgsb2Zmc2V0WSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmFkZENoaWxkKHJpZ2h0SXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/liJvlu7rkuIrpnaLlkozkuIvpnaLnmoTlnZdcclxuICAgICAgICAgICAgbGV0IHRvcEl0ZW0gPSB0aGlzLnF1ZXN0aW9uSXRlbS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgbGV0IGJvdHRvbUl0ZW0gPSB0aGlzLnF1ZXN0aW9uSXRlbS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgdG9wSXRlbS5wb3MoY2VudGVyWCxjZW50ZXJZIC0gNjQgKiBpKTtcclxuICAgICAgICAgICAgYm90dG9tSXRlbS5wb3MoY2VudGVyWCxjZW50ZXJZICsgNjQgKiBpKTtcclxuICAgICAgICAgICAgdGhpcy5vd25lci5hZGRDaGlsZCh0b3BJdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5vd25lci5hZGRDaGlsZChib3R0b21JdGVtKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgY3JlYXRlTWFwKCk6dm9pZHtcclxuICAgIC8vICAgICBsZXQgb2Zmc2V0WCA9IExheWEuc3RhZ2Uud2lkdGggLyAyIC0gNCAqIDU1IC0gNTUgLyAyO1xyXG4gICAgLy8gICAgIGxldCBvZmZzZXRZID0gTGF5YS5zdGFnZS5oZWlnaHQgLyAyIC0gMiAqIDY0IC0gNjQgLyAyO1xyXG4gICAgLy8gICAgIC8vIHkgPSA2NCB4ID0gNTUgeU9mZnNldCA9IDMyXHJcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgOTtpKyspe1xyXG4gICAgLy8gICAgICAgICBsZXQgeWxpbWl0ID0gMDtcclxuICAgIC8vICAgICAgICAgLy8gMCAxIDIgMyA0IDUgNiA3IDhcclxuICAgIC8vICAgICAgICAgLy8gNSA2IDcgOCA5IDggNyA2IDVcclxuICAgIC8vICAgICAgICAgaWYoaSA8PSA0KXtcclxuICAgIC8vICAgICAgICAgICAgIHlsaW1pdCA9IDUgKyBpO1xyXG4gICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgIHlsaW1pdCA9IDEzIC0gaTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBsZXQgeU9mZnNldCA9ICh5bGltaXQgLSA1KSAqIDMyO1xyXG4gICAgLy8gICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5bGltaXQ7aisrKXtcclxuICAgIC8vICAgICAgICAgICAgIC8v5Yib5bu66aKE5Yi25L2TXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucXVlc3Rpb25JdGVtLmNyZWF0ZSgpO1xyXG4gICAgLy8gICAgICAgICAgICAgLy/mt7vliqDpooTliLbkvZPliLDpobXpnaLkuIpcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMub3duZXIuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAvLyAgICAgICAgICAgICAvL+iuvue9ruS9jee9rlxyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5wb3MoaSAqIDU1ICsgb2Zmc2V0WCxqICogNjQgLSB5T2Zmc2V0ICsgb2Zmc2V0WSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG5cclxufSJdfQ==
