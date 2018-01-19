cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        playButton: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.starDuration = 0;
        this.score = 0;

        this.playerC = this.player.getComponent("Player")
        this.playerC.half = this.node.width / 2
        this.playerC.isdead=true
        this.playButton.node.active = true;
        this.groundY = this.ground.y + this.ground.height / 2;
    },
    play() {
        this.playerC.isdead = false
        this.playButton.node.active = false;
        this.spawnNewStar();
        this.playerC.node.runAction(this.playerC.jumpAction);
    },
    spawnNewStar: function() {
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.newStar = cc.instantiate(this.starPrefab);
        this.newStar.getComponent('Star').game = this;
        this.node.addChild(this.newStar)
        this.newStar.setPosition(this.getNewStarPosition())
    },

    getNewStarPosition: function() {

        var randY = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight + 50;
        var maxX = this.node.width / 2;
        var randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY)
    },
    // start() {

    // },

    gameOver: function() {
        console.log("call gameover")
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        this.playerC.isdead = true;
        this.playButton.node.active = true;
        this.playerC.node.y = -152
        if (this.newStar.node) {
            this.newStar.node.destroy();
        }
        //cc.director.loadScene('game');
    },
    gainScore: function() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
});