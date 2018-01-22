
cc.Class({
    extends: cc.Component,
    properties: {
        local: true,
        standard: true,
        storeData: [],
    },

    connectServer() {
        if (this.local) {
            this.initialCardsStore()
            console.log("cards count is :" + this.storeData.length)
            //  this.gameCtrl.setStore(this.storeData)
            this.storeData.sort(randomSort)
            console.log("random")
            this.gameCtrl.setStore(this.storeData)
            console.log("id:" + this.storeData[10].id + " type:" + this.storeData[10].type)
        }
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
