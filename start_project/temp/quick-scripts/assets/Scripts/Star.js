(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '65f113nFXRFvJMrJN7dMia+', 'Star', __filename);
// Scripts/Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        timer: 0,
        starDuration: 0
    },
    getPlayerDistance: function getPlayerDistance() {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },
    onPicked: function onPicked() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        this.game.gainScore();
        // 然后销毁当前星星节点
        this.node.destroy();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.starDuration = this.game.starDuration;
    },


    // start() {

    // },

    update: function update(dt) {
        if (this.timer > this.starDuration) {
            console.log("game from star");
            this.game.gameOver();
            return;
        }
        this.timer += dt;
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Star.js.map
        