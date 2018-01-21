
cc.Class({
    extends: cc.Component,

    properties: {
        store: [],
        wan: {
            default: null,
            type: cc.Prefab
        },
        tiao: {
            default: null,
            type: cc.Prefab
        },
        bing: {
            default: null,
            type: cc.Prefab
        },
        feng: {
            default: null,
            type: cc.Prefab
        },
        hua: {
            default: null,
            type: cc.Prefab
        }
    },
    createCardsStore() {
        var id=0
        for (var i = 0; i < 9; i++)//create wan bing tiao
        {
            for (var j = 0; j < 4; j++) {
                var wan = cc.instantiate(this.wan)
                wan.getComponent('Mahjong').num = i + 1
                var bing = cc.instantiate(this.bing)
                bing.getComponent('Mahjong').num = i + 1
                var tiao = cc.instantiate(this.tiao)
                tiao.getComponent('Mahjong').num = i + 1
                wan.onDesk()
                bing.onDesk()
                tiao.onDesk()
                this.store += wan
                this.store += bing
                this.store += tiao
            }
        }
        //feng dong nan xi bei zhong fa bai
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 7; i++) {
                var f = cc.instantiate(this.feng)
                f.num = i + 1
                f.onDesk()
                this.store += f
            }
        }
        //hua chun xia qiu dong mei lan song ju
        for (var i = 0; i < 8; i++) {
            var h = cc.instantiate(this.hua)
            h.num = i + 1
            h.onDesk()
            this.store += h
        }
        //this.gameCtrl
        //add gameCtrl in it
    },

    refreshCards() {//洗牌
    },
    nextCard() {//摸一张牌
    },
    getEndCard() {//摸一张杠牌
    },

    //for test
    printCards() {

    }

});
