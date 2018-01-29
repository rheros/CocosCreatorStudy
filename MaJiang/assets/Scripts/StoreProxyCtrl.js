
cc.Class({
    extends: cc.Component,

    properties: {
        wallPosProxyTop: cc.Node,
        wallPosProxyBottom: cc.Node,
        handPosProxy: cc.Node,
        handCardPrefab:
            {
                default: [],
                type: [cc.Prefab]
            },
        handCards: [],
        coverCard: cc.Prefab,
        proxySide: {
            default: Sides.Bottom,
            type: cc.Enum(Sides)
        },
        dirLabel: cc.Label,
        idLabel: cc.Label,
        Down: true,
    },
    cleanNodes() {
        var BnodeState = this.wallPosProxyBottom.active
        var TnodeState = this.wallPosProxyTop.active
        var HnodeState = this.handPosProxy.active

        this.wallPosProxyBottom.active = true
        this.wallPosProxyTop.active = true
        this.handPosProxy.active = true
        this.wallPosProxyBottom.getComponent(cc.Layout).enabled = true
        this.wallPosProxyTop.getComponent(cc.Layout).enabled = true
        this.handPosProxy.getComponent(cc.Layout).enabled = true

        this.wallPosProxyBottom.children.forEach(d => {
            d.destroy()
        })
        this.wallPosProxyTop.children.forEach(d => {
            d.destroy()
        })
        this.handPosProxy.children.forEach(d => {
            d.destroy()
        })

        this.wallPosProxyBottom.active = BnodeState
        this.wallPosProxyTop.active = TnodeState
        this.handPosProxy.active = HnodeState
    },
    addWallCard(name) {
        var card = cc.instantiate(this.coverCard)
        if (this.Down) {
            card.parent = this.wallPosProxyBottom
        }
        else {
            card.parent = this.wallPosProxyTop
        }
        card.scale = 1
        this.Down = !this.Down
        return card
    },//exclude bottom
    initialThreeSidesHandCards() {
        for (var i = 0; i < 13; i++) {
            if (this.proxySide != Sides.Bottom) {
                var card = cc.instantiate(this.handCardPrefab[0])
                card.name = GetSideString(this.proxySide)
                this.handCards.push(card)
                card.parent = this.handPosProxy
                card.active = false
            }
        }
    },
    initialHandCard(cardsData) {
        //12 cards
        var showInitialData=false
        if (showInitialData&&this.proxySide == Sides.Bottom) {
            cc.warn("server initial cards data")
        cardsData.forEach(cd => {
            cc.warn("num:"+cd.num+" id"+cd.id+" type:"+getMajhongTypeString(cd.type))
        });
        }
        for (var i = 0; i < 3; i++) {
            if (this.proxySide == Sides.Bottom) {
                for (var j = 0; j < 4; j++) {
                    this._addHandCard(cardsData,j+i*4)
                }
            } else {
                this.setHandCard((i + 1) * 4)
            }
        }
        //last one
        if (this.proxySide == Sides.Bottom) {
           this._addHandCard(cardsData,12)
        }
        else {
            this.setHandCard(13)
        }
        this.handPosProxy.getComponent(cc.Layout).enabled=true
    },
    _addHandCard(data,index)
    {
        var cd=data[index]
        var card = cc.instantiate(this.handCardPrefab[cd.type])
        card.scale=1
        var ma = card.getComponent("Mahjong")
        ma.num=cd.num
        ma.id=cd.id
        ma.setDisplay()
        card.parent = this.handPosProxy
        this.handCards.push(card)
    },
    setHandCard(num) {
        for (var i = 0; i < 13; i++) {
            if (i < num) {
                this.handCards[i].active = true
            } else {
                this.handCards[i].active = false
            }
        }
    },
    setViewOrder() {
        this.wallPosProxyTop.getComponent(cc.Layout).enabled = false
        this.wallPosProxyBottom.getComponent(cc.Layout).enabled = false
        if (this.proxySide == Sides.Right) {
            var count = this.wallPosProxyBottom.children.length
            for (var i = 0; i < count; i++) {
                this.wallPosProxyTop.children[i].zIndex = count - i - 1
                this.wallPosProxyBottom.children[i].zIndex = count - i - 1
            }
        }
    },
    setWallState(state) {
        this.wallPosProxyBottom.active = state
        this.wallPosProxyTop.active = state
    },
    setHandState(state) {
        this.handPosProxy.active = state
    },
    setAllState(state) {
        this.showWall(state)
        this.showHand(state)
    },
    setDirectionString(dir) {
        this.dirLabel.string = GetDirString(dir)
    },
    setPlayerId(id) {
        this.idLabel.string = id
    },
});
