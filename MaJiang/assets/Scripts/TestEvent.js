
cc.Class({
    extends: cc.Component,
    properties: {
        gameCtrl:cc.Node,
        btnContainer: cc.Node,
        btnState:{
            default:true,
            visible:false,
        },
        cardState:{
            default:true,
            visible:false,
        },
        revertState:{
            default:true,
            visible:false,
        },
    },
    //for UI
    onLoad()
    {
        this.GCtrl=this.gameCtrl.getComponent("GameCtrl")
    },
    showBtns() {
        this.btnContainer.active=this.btnState
        this.btnState=!this.btnState
    },
    revertzIndex()
    {

    this.revertState?this.GCtrl.store._resetViewSort():this.GCtrl.store._resetViewSort2()
     this.revertState=!this.revertState
    },
    toggleCardStore() {
        this.GCtrl.store.reshowCards(this.cardState)
        this.cardState=!this.cardState
        this.GCtrl.store._resetViewSort()
    }
});
