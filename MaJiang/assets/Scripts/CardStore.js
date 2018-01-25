
cc.Class({
    extends: cc.Component,

    properties: {
        cardsStore: [],
        backCardv:cc.Prefab,
        backCardh:cc.Prefab,
        backCardsStore:[],
        waitStore: [],
        deskPosProxy:[cc.Node],//eswn  : top right botom left
        cardsPrefab: {
            default: [],
            type: [cc.Prefab]// 用 type 指定数组的每个元素都是字符串类型
        },
        startIndex:0,
    },

    createCardWall(storeData) {
        var col = storeData.length / 4
        var curDir=this.gameCtrl.selfDir
        var sideArray=[]
        //before create  clean children
        this.deskPosProxy.forEach(data => {
            data.getComponent("StoreProxyCtrl").wallPosProxyBottom.children.forEach(d=>{
                d.destroy()
            })
            data.getComponent("StoreProxyCtrl").wallPosProxyTop.children.forEach(d=>{
                d.destroy()
            })
        });
        for(var i=0;i<4;i++)//array pos by eswn , the first pos is east
        {
            var offset=2-curDir
            sideArray[i]=this.deskPosProxy[(i+offset+4)%4] //the fist proxy is East
        }
        for (var i = 0; i < 4; i++) {
            var index=this.deskPosProxy.indexOf(sideArray[i])
            var cardPrefab=index%2?this.backCardh:this.backCardv
            for (var j = 0; j < col; j++) {
                var card=cc.instantiate(cardPrefab)
                sideArray[i].getComponent("StoreProxyCtrl").addWallCard(card)
                this.backCardsStore.push(card)
            }
        }
        this. _resetViewSort()
    },
    setDirectionString(index,dir){
        this.deskPosProxy[index].getComponent("StoreProxyCtrl").setDirectionString(dir)
    },

    refreshCards() {//洗牌
    },
    nextCard() {//摸一张牌
    },
    getEndCard() {//摸一张杠牌
    },

    //for test
    printCards() {

    },   
    _resetViewSort()
    {
        var bottomRoot=this.deskPosProxy[1].getComponent("StoreProxyCtrl").wallPosProxyBottom
        var topRoot=this.deskPosProxy[1].getComponent("StoreProxyCtrl").wallPosProxyTop
        var count=bottomRoot.children.length
        console.log(bottomRoot.x+" child "+bottomRoot.children[0].x)
        console.log(topRoot.x+"child"+topRoot.children[0].x)
        for(var i=0;i<count;i++)
        {
            topRoot.children[i].zIndex=count-i-1
            bottomRoot.children[i].zIndex=count-i-1
        }
    },

});
