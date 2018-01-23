
cc.Class({
    extends: cc.Component,

    properties: {
        cardsStore: [],
        backCardsStore:[],
        waitStore: [],
        deskPosProxy: [cc.Node],
        cardsPrefab: {
            default: [],
            type: [cc.Prefab]   // 用 type 指定数组的每个元素都是字符串类型
        },
        startIndex:0,
    },

    createStoreByData(storeData) {
        storeData.forEach(data => {
            console.log(" id:" + data.id + " type:" + data.type + " " + " num:" + data.num)
        });
    },
    setStoreByData(storeData) {
        console.log(this.cardsStore.length + " === from create ===")
        console.log("in the mid=======")
        storeData.forEach(data => {
            //  console.log(" id:" + data.id + " type:" + data.type + " " + " num:" + data.num)
            this.cardsStore.forEach(card => {
                console.log("card " + card)
                var cardC = card.getComponent("Mahjong")
                if (data.type == cardC.type && data.num == cardC.num) {
                    cardC.id = data.id
                    this.cardsStore.splice(this.cardsStore.indexOf(card), 1)
                    this.waitStore.push(card)
                }
            });
        });

        console.log("set cards the store count " + this.cardsStore.length + " waitstore count: " + this.waitStore.length)
        //put cards on desk
        var col = this.waitStore.length / 4 / 2
        //eswn
        for (var i = 0; i < 4; i++) {
            var pos = this.deskPosProxy[i]
            for (var j = 0; j < col; j++) {
                this.waitStore[i * col + j].parent = pos
                this.waitStore[i * col + j].x = 0
                this.waitStore[i * col + j].y = 0
            }
        }
        this.waitStore[0].parent = this.node
        this.waitStore[0].x = 0
        this.waitStore[0].y = 0
    },
    createCardWall(storeData) {
        col = this.storeData.length / 4
        for (var i = 0; i < 4; i++) {
            var pos = this.deskPosProxy[i]
            for (var j = 0; j < col; j++) {
                if(this.gameCtrl.dir)
                backCardsStore.push()
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
                wanc.node.active = true;
                var bing = cc.instantiate(this.cardsPrefab[1])
                var bingc = bing.getComponent('Mahjong')
                bingc.onDesk()
                bingc.num = i + 1
                bingc.node.active = true
                var tiao = cc.instantiate(this.cardsPrefab[2])
                var tiaoc = tiao.getComponent('Mahjong')
                tiaoc.num = i + 1
                tiaoc.onDesk()
                tiaoc.node.active = true
                this.cardsStore.push(wan)
                this.cardsStore.push(bing)
                this.cardsStore.push(tiao)
            }
        }
        //feng dong nan xi bei zhong fa bai
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 7; i++) {
                var f = cc.instantiate(this.cardsPrefab[3])
                var fc = f.getComponent('Mahjong')
                fc.num = i + 1
                fc.onDesk()
                fc.node.active = true
                this.cardsStore.push(f)
            }
        }
        //hua chun xia qiu dong mei lan song ju
        for (var i = 0; i < 8; i++) {
            var h = cc.instantiate(this.cardsPrefab[4])
            var hc = h.getComponent('Mahjong')
            hc.num = i + 1
            hc.onDesk()
            hc.node.active = true
            this.cardsStore.push(h)
        }
        console.log(this.cardsStore.length + " === from create ===")
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
