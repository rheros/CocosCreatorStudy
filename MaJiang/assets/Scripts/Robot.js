// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        isMain:false,
        isActive:false,
        id:100,
        coins: 0,
        winTimes: 0,
        loseTimes: 0,
        playTimes: 0,
        dir:{
            default:Directions.East,
            type:cc.Enum(Directions)
        }
    },
    initialPlayerDataLocal() {
        var data = new PlayerDataPack()
        data.id = this.id
        data.isMain = this.isMain
        data.isActive = this.isActive
        data.dir = this.dir
        data.coins =this.coins
        data.winTimes = this.winTimes
        data.loseTimes = this.loseTimes
        data.playTimes = this.playTimes
        return data
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
