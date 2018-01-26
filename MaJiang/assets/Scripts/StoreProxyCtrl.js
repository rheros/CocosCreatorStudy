
cc.Class({
    extends: cc.Component,

    properties: {
        wallPosProxyTop:cc.Node,
        wallPosProxyBottom:cc.Node,
        handPosProxy:cc.Node,
        dirLabel:cc.Label,
        idLabel:cc.Label,
        Down:true,
    },
    addWallCard(card)
    {
        if(this.Down)
        {
            card.parent=this.wallPosProxyBottom
        }
        else
        {
            card.parent=this.wallPosProxyTop
        } 
        card.scale=1
        this.Down=!this.Down
    },
    setDirectionString(dir)
    {
        this.dirLabel.string=GetDirString(dir)
    },
    setPlayerId(id)
    {
        this.idLabel.string=id
    }
});
