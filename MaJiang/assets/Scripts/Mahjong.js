cc.Class({
    extends: cc.Component,
    properties: {
        type : {  
            default : MaTypes.wan,  
            type : cc.Enum(MaTypes)
        } ,
        label:cc.Label,
        num: {
            get () {
               return this._num
            },
            set(value){
                this._num=value
                this.label.string=""+this._num
            }
        },
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
        from: {
            default: null,
            type: cc.Node
        }
    },
    clicked() {
        this.GameCtrl.cardOut()
    },
    onDesk() {
        this._hideAll()
        this.desk.active = true
    },
    inHand() {
        this._hideAll()
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
    }
});
