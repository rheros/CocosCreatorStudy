cc.Class({
    extends: cc.Component,

    properties: {
        id:110,
        coins: 0,
        winTimes: 0,
        loseTimes: 0,
        playTimes: 0,
   
        //about contract
        controller: cc.Node,
        
        //about game
        dir:{
            default:Directions.East,
            type:cc.Enum(Directions)
        },
        isMain: false,
        isActive: false,
        wanCards: [],
        bingCards: [],
        tiaoCards: [],
        fengCards: [],
        huaCards: [],
      //  cardsStore: {wanCards, bingCards, tiaoCards, fengCards, huaCards },
        listionCards: [],
        newCard: null,
        gaintCards: [],//吃碰杠
        onDeskCards:[],//打出的牌
    },

    // LIFE-CYCLE CALLBACKS:
    initialInfo(coins, wintimes, losetimes, playtimes, ctrl) {
        this.coins = coins
        this.winTimes = wintimes
        this.loseTimes = loseTimes
        this.playTimes = playtimes
        this.controller = ctrl
    },
    intialCards(cards) {//起手牌
        cards.forEach(card => {
            this._classifyCard(card,true)
            card.from=this
        });
    },
    putCardOut(card) {//出牌
        _classifyCardInOut(card,false)
    },
    getCardIn(card) {//摸牌
        this.newCard = card
    },
    getListion() {//获取听牌
    },
    getFour() {//计算是否有杠牌
    },
    //private
    _classifyCardInOut(card, isin) {//根据类型来加入牌
        switch (card.type) {
            case "wan":
                if (isin)
                    this.wanCards += card
                else
                    this.wanCards -= card
                break
            case "bing":
                if (isin)
                    this.bingCards += card
                else
                    this.bingCards -= card
                break
            case "tiao":
                if (isin)
                    this.tiaoCards += card
                else
                    this.tiaoCards -= card
                break
            case "feng":
                if (isin)
                    this.fengCards += card
                else
                    this.fengCards -= card
                break
            case "hua":
                if (isin)
                    this.huaCards += card
                else
                    this.huaCards -= card
                break
            default:
            //do nothing
        }
    },
    _calListion() {//计算听牌

    },
    _isWin() {//判断是否获胜
    },

});
