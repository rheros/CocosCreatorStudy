
cc.Class({
    extends: cc.Component,

    properties: {
        players: [],
       
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        console.log("in onload from gamectrl")
        this.store = this.getComponent("CardStore")
        this.store.gameCtrl = this
        this.store.createCardsStore()
        this.ser = this.getComponent("Main")
        this.ser.connectServer()
    },
    setStore(storeData) {
        this.store.setStoreByData(storeData)
    },
    startGame() {
    },
    cardOut(card) {
    },
    update(dt) {
    },
    _newRound() {
    },

});
