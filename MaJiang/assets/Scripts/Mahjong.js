cc.Class({
    extends: cc.Component,
    properties: {
        type: {
            default: MaTypes.wan,
            type: cc.Enum(MaTypes)
        },
        num: 1,
        id: 0,
        GameCtrl:
        {
            default:null,
            visible:false
        },
        hand: {
            default: null,
            type: cc.Node
        },
        labels: {
            default: [],
            type: [cc.Node]
        },
        from: cc.Node
    },
    clicked() {
        this.GameCtrl.cardOut()
    },
    onDesk() {
        this._hideAll()
        if (this.desk != null) {
            this.desk.getComponent('MahjongLabelCtrl').setNum(this.num)
            this.desk.active = true
        }
    },
    setDisplay() {
        this.desk.getComponent('MahjongLabelCtrl').setNum(this.num)
    },
    setNum(num) {
        this._hideLabels()
        this.labels[num].active = true
    },
    _hideLabels() {
        for (var i = 1; i < this.labels.length; i++) {
            this.labels[i].active = false
        }
    },
});
