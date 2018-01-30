
cc.Class({
    extends: cc.Component,

    properties: {
        cardsStore: [],
        backCardsStore: [],
        waitStore: [],
        startIndex: 100,
        currentIndex: 100,
        gangIndex: 100,
        startSide: 0,
        deskPosProxy: [cc.Node],//eswn  : top right botom left
        cardsPrefab: {
            default: [],
            type: [cc.Prefab]// 用 type 指定数组的每个元素都是字符串类型
        },
    },
    //clean nodes children only call on game initial
    cleanDesk() {
        this.deskPosProxy.forEach(p => {
            p.getComponent("StoreProxyCtrl").cleanNodes()
        })
    },
    createCardWall(storeData) {
        cc.log("create wall")
        var col = storeData.length / 4
        var sideArray = []
        //before create  clean children
        for (var i = 0; i < 4; i++)//array pos by enws , the first pos is east
        {
            var side = directionToSide(this.gameCtrl.selfDir, i)
            sideArray[i] = this.deskPosProxy[side] //the fist proxy is East
        }
        //create card 
        for (var i = 0; i < 4; i++) {
            var index = this.deskPosProxy.indexOf(sideArray[i])
            for (var j = 0; j < col; j++) {
                name = "" + (i * col + j)
                var card = sideArray[i].getComponent("StoreProxyCtrl").addWallCard(name)
                this.backCardsStore.push(card)
            }
        }

        //displayState
        this.deskPosProxy.forEach(element => {
            var proxy = element.getComponent("StoreProxyCtrl")
            proxy.initialThreeSidesHandCards()//exculde Bottom

            //visible set
            proxy.setWallState(true)
            proxy.setHandState(true)

            //resort view order
            this.schedule(function () {
                proxy.setViewOrder()
            }, 0.01, false)
        });
    },
    initialHandCards(playersData) {
        this.deskPosProxy.forEach(p => {
            p.getComponent("StoreProxyCtrl").initialHandCard(playersData)
        })
    },
    reshowCards(state) {//全部背面显示牌库
        cc.log("change cards click sate is " + state)
        this.deskPosProxy.forEach(element => {
            element.getComponent("StoreProxyCtrl").wallPosProxyBottom.children.forEach(d => {
                d.active = state
            })
            element.getComponent("StoreProxyCtrl").wallPosProxyTop.children.forEach(d => {
                d.active = state
            })
        });
    },
    setStartData(side,index) {
        var col=this.backCardsStore.length / 4
        cc.warn("side end is "+(side+1)*col)
        this.startIndex = (side+1)*col-index*2-1
        this.gangIndex=this.startIndex
        cc.warn("start index:"+this.startIndex+" side:"+side+" index:"+index)

        this.schedule(function () {
            for(var i=0;i<11;i++)
        {
            this.backCardsStore[this.startIndex].active=false
            this.startIndex--
        }
            
        }, 0.5, false)
        
    },
    nextCard() {//摸一张牌
        backCardsStore[currentIndex].active = false
        currentIndex--
        if (currentIndex == gangIndex) {
            cc.warn("gameOver")

        } else if (currentIndex < 0) {
            currentIndex = gangIndex
        }
    },
    getEndCard() {//摸一张杠牌

        backCardsStore[gangIndex].active = false
        gangIndex++
        if (currentIndex == startIndex) {
            cc.warn("gameOver")

        } else if (currentIndex < 0) {
            currentIndex = gangIndex
        }
    },

});
// 