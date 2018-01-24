
cc.Class({
    extends: cc.Component,
    properties: {
        local: true,
        standard: true,
        storeData: [],
        players: [],
        robots:{
            default:[],
            type:[cc.Node]
        },
    },

    connectServer() {
        if (this.local) {

            this.gameCtrl.setMode(this.standard);//tell client the mode isstand
            this._getDatas()
            this._randomDirectoions()
            this.gameCtrl.initialPlayers(this.players);
            
            this.initialCardsStore()//createCardsStore
            this.storeData.sort(randomSort)
            this.gameCtrl.setStore(this.storeData)//tell client to create Wall
        }
    },
    _getDatas()
    {
        this.robots.forEach(node => {
            this.players.push(node.getComponent("Robot"))
        });
        this.players.push(this._initialPlayerDataLocal())
    },
    _randomDirectoions()
    {
        console.log("players length "+this.players.length)
        this.players.sort(randomSort)
        for(var i=0;i<this.players.length;i++)
        {
            this.players[i].dir=i
            console.log("players dir "+i+" dir"+this.players[i].dir)
        }
    },
    _initialPlayerDataLocal() {
        var data = new PlayerDataPack()
        data.id=this.getComponent("Player").id
        data.isMain=true
        data.isActive=true
        data.dir =0
        data.coins = 1000
        data.winTimes = 20
        data.loseTimes = 10
        data.playTimes = 30
        return data
    },

    onLoad() {
        this.gameCtrl = this.getComponent("GameCtrl")
    },
    initialCardsStore() {
        var baseId = 1
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
                    this.storeData.push(c)
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
                this.storeData.push(cardData)
            }
        }
        if (!this.standard) {
            baseId = 137
            //hua
            for (var i = 0; i < 8; i++) {
                var cardData = new StoreDataPack()
                cardData.id = baseId + i
                cardData.type = MaTypes.hua
                cardData.num = i + 1
                this.storeData.push(cardData)
            }
        }
    },
    cardOut(card) {

    },
    update(dt) {

    },
    _newRound() {
    },
    _RandomStroe() {

    }
});
