
cc.Class({
    extends: cc.Component,
    properties: {
        local: true,
        standard: true,
        storeData: [],
        players: [],
        startIndex: 0,
        currentIndex: 0,
        dize1: 1,
        dize2: 1,
        robots: {
            default: [],
            type: [cc.Node]
        },
    },

    connectServer() {
        if (this.local) {
            this.gameCtrl.setMode(this.standard);//tell client the mode isstand
            this._getDatas()
            this._randomDirectoions()
            this.gameCtrl.initialPlayers(this.players);
            //createCardsStore
            this.storeData = this.initialCardsStore(this.standard)
            this.storeData = this.storeData.sort(randomSort)
            //tell client to create Wall
            this.gameCtrl.setStore(this.storeData)
            //tell client to initial handCards, will from server
            var initialPlayers = this._initialHandCards(this.players)
            //create dize
            this._RollDize()
            cc.warn("dize1:" + this.dize1 + "  dize2:" + this.dize2)
            var minNum = this.dize1 <= this.dize2 ? this.dize1 : this.dize2
            var startSide = this._getStartSide(this.dize1 + this.dize2)
            this.gameCtrl.setDize({dize1:this.dize1,dize2:this.dize2,startSide:startSide,startIndex:minNum})
            //now 
            var singleData = this._getInitialDataById(this.gameCtrl.selfPlayer.id)
            this.gameCtrl.setPlayerCards(singleData.cards)

        }
    },


    onLoad() {
        this.gameCtrl = this.getComponent("GameCtrl")
    },
    initialCardsStore(isStandard) {
        cc.log("in initialCardsStore")
        var baseId = 1
        var data = []
        //wan
        for (var k = 0; k < 3; k++) {
            var type = ""
            if (k == 0) {
                type = MaTypes.wan
            } else if (k == 1) {
                type = MaTypes.bing
            } else {
                type = MaTypes.tiao
            }
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 4; j++) {
                    var c = new StoreDataPack()
                    c.id = baseId + k * 36 + i * 4 + j
                    c.type = type
                    c.num = i + 1
                    c.inStore = true
                    data.push(c)
                }
            }
        }
        baseId = 109
        //feng
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                var cardData = new StoreDataPack()
                cardData.id = baseId + i * 4 + j
                cardData.type = MaTypes.feng
                cardData.num = i + 1
                cardData.inStore = true
                data.push(cardData)
            }
        }
        if (!isStandard) {
            baseId = 137
            //hua
            for (var i = 0; i < 8; i++) {
                var cardData = new StoreDataPack()
                cardData.id = baseId + i
                cardData.type = MaTypes.hua
                cardData.num = i + 1
                cardData.inStore = true
                data.push(cardData)
            }
        }
        return data
    },
    cardOut(card) {

    },
    update(dt) {

    },
    _newRound() {
    },

    _getDatas() {
        this.robots.forEach(node => {
            this.players.push(node.getComponent("Robot").initialPlayerDataLocal())
        });
        this.players.push(this._initialPlayerDataLocal())
    },
    _randomDirectoions() {
        this.players.forEach(element => {
            cc.log(element.id)
        });
        this.players.sort(randomSort)
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].dir = i
            cc.log("players dir " + GetDirString(i) + " id" + this.players[i].id)
        }
    },
    _initialPlayerDataLocal() {
        var data = new PlayerDataPack()
        data.id = this.getComponent("Player").id
        data.isMain = true
        data.isActive = true
        data.dir = 0
        data.coins = 1000
        data.winTimes = 20
        data.loseTimes = 10
        data.playTimes = 30
        return data
    },

    _initialHandCards(players) {
        this.currentIndex = this.startIndex
        //12 X 3 =36cards
        for (var i = 0; i < 3; i++) {
            players.forEach(player => {
                for (var k = 0; k < 4; k++) {
                    var c = this.storeData[this.currentIndex]
                    c.inStore = false
                    player.cards.push(c)
                    this.currentIndex--
                    if (this.currentIndex < 0) {
                        this.currentIndex = this.storeData.length - 1
                    }
                }
            });
        }
        players.forEach(player => {
            var card = this.storeData[this.currentIndex]
            card.inStore = false
            player.cards.push(card)
            this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.storeData.length - 1
            }
        });
        return players
    },
    _getInitialDataById(id) {
        var data = null
        this.players.forEach(p => {
            if (p.id == id)
                data = p
        })
        if (data == null) {
            cc.warn("no cards data")
        }
        return data
    },
    _RollDize() {
        this.dize1 = RandomDize(1, 6)
        this.dize2 = RandomDize(1, 6)
    },
    _getStartSide(num) {
        return (num - 1) % 4
    }
});
