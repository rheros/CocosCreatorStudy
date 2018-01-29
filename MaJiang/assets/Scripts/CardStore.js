
cc.Class({
    extends: cc.Component,

    properties: {
        cardsStore: [],
        backCardv: cc.Prefab,
        backCardh: cc.Prefab,
        backCardsStore: [],
        waitStore: [],
        startIndex: 100,
        deskPosProxy: [cc.Node],//eswn  : top right botom left
        cardsPrefab: {
            default: [],
            type: [cc.Prefab]// 用 type 指定数组的每个元素都是字符串类型
        },
        startIndex: 0,
    },
    cleanDesk() {
        this._cleanDeskTop(this.deskPosProxy)
    },
    createCardWall(storeData) {
        var col = storeData.length / 4
        var curDir = this.gameCtrl.selfDir
        var sideArray = []
        //before create  clean children
        for (var i = 0; i < 4; i++)//array pos by eswn , the first pos is east
        {
            var offset = 2 - curDir
            sideArray[i] = this.deskPosProxy[(i + offset + 4) % 4] //the fist proxy is East
        }
        for (var i = 0; i < 4; i++) {
            var index = this.deskPosProxy.indexOf(sideArray[i])
            var cardPrefab = index % 2 ? this.backCardh : this.backCardv
            for (var j = 0; j < col; j++) {
                var card = cc.instantiate(cardPrefab)
                card.name = "" + (i * col + j)
                sideArray[i].getComponent("StoreProxyCtrl").addWallCard(card)
                this.backCardsStore.push(card)
            }
        }
        //revert righ view order
        this.scheduleOnce(function () {
            this._resetViewSort(this.deskPosProxy)
        }, 0.1);
        //hide wall
        this.deskPosProxy.forEach(element => {
            element.getComponent("StoreProxyCtrl").wallPosProxyTop.active = false
            element.getComponent("StoreProxyCtrl").wallPosProxyBottom.active = false
        });
    },
    initialHandCards(playersData) {
        for (var i = 0; i < 3; i++) {
            playersData.forEach(pd => {
                switch (pd.dir) {
                    case Directions.East:
                        console.log("initialSelfCard")
                        for (var j = 0; j < 4; j++) {
                            var cData = pd.cards.pop()
                            this.deskPosProxy[2]
                        }
                        
                        break
                    case Directions.Bottom:
                        break
                    case Directions.Bottom:
                        break
                    case Directions.Bottom:
                        break

                }

            })
        }
    },
    reshowCards(state) {//全部背面显示牌库
        console.log("change cards click sate is " + state)
        this.deskPosProxy.forEach(element => {
            element.getComponent("StoreProxyCtrl").wallPosProxyBottom.children.forEach(d => {
                d.active = state
            })
            element.getComponent("StoreProxyCtrl").wallPosProxyTop.children.forEach(d => {
                d.active = state
            })
        });
    },
    nextCard() {//摸一张牌
    },
    getEndCard() {//摸一张杠牌
    },
    //清理桌面位置代理对象下面的子物体
    _cleanDeskTop(PosProxy) {
        PosProxy.forEach(element => {
            element.getComponent("StoreProxyCtrl").wallPosProxyTop.active = true
            element.getComponent("StoreProxyCtrl").wallPosProxyBottom.active = true
        });
        PosProxy.forEach(data => {
            var proxy = data.getComponent("StoreProxyCtrl")
            proxy.wallPosProxyBottom.children.forEach(d => {
                d.destroy()
            })
            proxy.wallPosProxyTop.children.forEach(d => {
                d.destroy()
            })
            proxy.handPosProxy.children.forEach(d => {
                d.destroy()
            })
        });
    },
    _resetViewSort(proxyArray) {
        //disable Layout
        proxyArray.forEach(proxy => {
            var bottom = proxy.getComponent("StoreProxyCtrl").wallPosProxyBottom
            var top = proxy.getComponent("StoreProxyCtrl").wallPosProxyTop
            top.getComponent(cc.Layout).enabled = false
            bottom.getComponent(cc.Layout).enabled = false
        });
        console.log("reset view")
        var bottomRoot = proxyArray[1].getComponent("StoreProxyCtrl").wallPosProxyBottom
        var topRoot = proxyArray[1].getComponent("StoreProxyCtrl").wallPosProxyTop

        var count = bottomRoot.children.length
        for (var i = 0; i < count; i++) {
            topRoot.children[i].zIndex = count - i - 1
            bottomRoot.children[i].zIndex = count - i - 1
        }
    },
});
// 