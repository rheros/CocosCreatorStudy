
cc.Class({
    extends: cc.Component,

    properties: {
        type: "end",//"wan bing tiao feng hua end"
        num: 1,
        id:0,
        GameCtrl: null,
        hand: {
            default: null,
            type: cc.Node
        },
        Desk: {
            default: null,
            type: cc.Node
        },
        Store: {
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
        _hideAll()
        this.ondesk.active = true
    },
    inhand() {
        _hideAll()
        this.inhand.active = true
    },
    inStore() {
        _hideAll()
        this.inStore.active = true
    },
    _hideAll() {
        this.inhand.active = false
        this.inStore.active = false
        this.ondesk.active = false
    }
});
