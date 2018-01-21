


cc.Class({
    extends: cc.Component,
    properties: {
        local: true,
        gameCtrl: {
            default: null,
            type: cc.Node
        },
        storeData: [],
        StoreDataPack: cc.Class({
            name: "StoreDataPack",
            actor: function () {
                cc.log("shit");
            },
            properties: {

                id: 0,
                type: "wan",// bing tiao feng hua
                num: 0,
            }
        })
    },
    connectServer() {
        if (this.local) {
            this.initialCardsStore()
            console.log(this.storeData.length)
            return 0
        }
    },
    onLoad() {
    },
    initialCardsStore() {
        var id = 1
        //wan
        for (var k = 0; k < 3; k++) {
            var type = ""
            if (k == 0) {
                type = "wan"
            } else if (k == 1) {
                type = "bing"
            } else {
                type = "tiao"
            }
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 4; j++) {
                    var c = new this.StoreDataPack()
                    c.id = id + k * 36 + i * 4 + j
                    c.type = type
                    c.Num = i + 1
                    console.log(id)
                    this.storeData += c
                }
            }
        }
        id++
        //feng
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                var cardData = new StoreDataPack()
                cardData.id = id + i * 4 + j
                cardData.type = "feng"
                cardData.Num = i + 1
                this.storeData += cardData
            }
        }
        id++
        //hua
        for (var i = 0; i < 8; i++) {
            var cardData = new StoreDataPack()
            cardData.id = id + i
            cardData.type = "feng"
            cardData.Num = i + 1
            this.storeData += cardData
        }
    },
    cardOut(card) {

    },
    update(dt) {

    },
    _newRound() {
    },

});
