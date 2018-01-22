import { Object } from "../../creator";



cc.Class({
    extends: cc.Component,

    properties: {
        cardsStore: [],
        waitStore: [],
        deskPosProxy: [cc.Node],
        cardsPrefab: {
            default: [],
            type: [cc.Prefab]   // 用 type 指定数组的每个元素都是字符串类型
        },
    },
    createStoreByData(storeData) {
        storeData.forEach(data => {
            console.log(" id:" + data.id + " type:" + data.type + " " + " num:" + data.num)
        });
    },
    setStoreByData(storeData) {
        storeData.forEach(data => {
            this.cardsStore.forEach(card => {
                if (data.type == card.type && data.num == card.num) {
                    card.id = data.id
                    this.cardsStore.splice(this.cardsStore.indexOf(card), 1)
                    this.waitStore.push(card)
                }
            });
        });
        console.log("set cards the store count " + this.cardsStore.length + " deskStore count " + this.waitStore.length)
        //put cards on desk
        var col = this.waitStore.length / 4 / 2
        //eswn
        for (var i = 0; i < 4; i++) {
            var pos = this.deskPosProxy[i]
            for (var j = 0; j < col; j++) {
                this.waitStore[i * col + j].parent = pos
                this.waitStore[i * col + j].node.x = 0
                this.waitStore[i * col + j].node.y = 0
            }
        }

    },
    createCardsStore() {
        var id = 0
        for (var i = 0; i < 9; i++)//create wan bing tiao
        {
            for (var j = 0; j < 4; j++) {
                var wan = cc.instantiate(this.cardsPrefab[0])
                var wanc = wan.getComponent('Mahjong')
                wanc.num = i + 1
                wanc.onDesk()
                wanc.node.active=false;
                var bing = cc.instantiate(this.cardsPrefab[1])
                var bingc = bing.getComponent('Mahjong')
                bingc.onDesk()
                bingc.num = i + 1
                bingc.node.active=false
                var tiao = cc.instantiate(this.cardsPrefab[2])
                var tiaoc=tiao.getComponent('Mahjong')
                tiaoc.num = i + 1
                tiaoc.onDesk()
                tiaoc.node.active=false
                this.cardsStore.push(wan)
                this.cardsStore.push(bing)
                this.cardsStore.push(tiao)
            }
        }
        //feng dong nan xi bei zhong fa bai
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 7; i++) {
                var f = cc.instantiate(this.cardsPrefab[3])
                var fc=f.getComponent('Mahjong')
                fc.num = i + 1
                fc.onDesk()
                fc.node.active=false
                this.cardsStore.push(f)
            }
        }
        //hua chun xia qiu dong mei lan song ju
        for (var i = 0; i < 8; i++) {
            var h = cc.instantiate(this.cardsPrefab[4])
            var hc=h.getComponent('Mahjong')
            hc.num = i + 1
            hc.onDesk()
            hc.node.active=false
            this.cardsStore.push(h)
        }
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
