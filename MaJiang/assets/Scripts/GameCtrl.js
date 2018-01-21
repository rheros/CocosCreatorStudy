
cc.Class({
    extends: cc.Component,
    
    properties: {
        players: [],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.store = this.node.getComponent("CardStore")
        this.store.gameCtrl=this
        this.server=this.node.getComponent("CenterCtrl")
        this.server.connectServer()
    },
    startGame()
    {

    },
    cardOut(card) {
    },
    update(dt) {
    },
    _newRound() {

    }
});
