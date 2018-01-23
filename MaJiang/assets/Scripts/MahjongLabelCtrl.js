cc.Class({
    extends: cc.Component,

    properties: {
        labels:{
            default:[],
            type:[cc.Node]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    setNum(num)
    {
       this._hideLabels()
       this.labels[num].active=true
    },
    _hideLabels()
    {
        for(var i=1;i<this.labels.length;i++)
        {
            this.labels[i].active=false
        }
    }
    // update (dt) {},
});
