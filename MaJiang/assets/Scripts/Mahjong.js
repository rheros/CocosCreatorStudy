cc.Class({
    extends: cc.Component,
    properties: {
        type : {  
            default : MaTypes.wan,  
            type : cc.Enum(MaTypes)
        } ,
        num:1,
        id:0,
        GameCtrl: null,
        hand: {
            default: null,
            type: cc.Node
        },
        desk: {
            default: null,
            type: cc.Node
        },
        store: {
            default: null,
            type: cc.Node
        },
        from: cc.Node
    },
    clicked() {
        this.GameCtrl.cardOut()
    },
    onDesk() {
        this._hideAll()
        this.desk.getComponent('MahjongLabelCtrl').setNum(this.num)
        this.desk.active = true
    },
    inHand() {
        this._hideAll()
        this.hand.getComponent('MahjongLabelCtrl').setNum(this.num)
        this.hand.active = true
    },
    inStore() {
        this._hideAll()
        this.store.active = true
    },
    _hideAll() {
        this.hand.active = false
        this.store.active = false
        this.desk.active = false
    },
  
});
