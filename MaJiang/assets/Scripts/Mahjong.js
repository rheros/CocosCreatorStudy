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
        labels: {
            default: [],
            type: [cc.Node]
        },
        from:{
            default:null,
            type:cc.Node,
            visible:false
        }
    },
    clicked() {
        this.GameCtrl.cardOut()
    },
    setDisplay() {
        this._hideLabels()
        if(this.type==MaTypes.feng)
        {
            cc.warn(getFengString(this.num))
        }
        else
        {
            cc.warn(this.num)
        }
        this.labels[this.num].active = true
    },
    _hideLabels() {
        for (var i = 1; i < this.labels.length; i++) {
            this.labels[i].active = false
        }
    },
});
