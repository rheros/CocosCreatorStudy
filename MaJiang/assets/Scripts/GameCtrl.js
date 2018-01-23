
cc.Class({
    extends: cc.Component,

    properties: {
        selfPlayer: cc.Node,
        selfDir: 0,

        East: null,
        South: null,
        West: null,
        North: null,

    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.selfPlayer = this.getComponent("Player")
        console.log("in onload from gamectrl")
        this.store = this.getComponent("CardStore")
        this.store.gameCtrl = this
        this.store.createCardsStore()
        console.log(this.store.cardsStore.length + " from gamectrl")
        this.ser = this.getComponent("Main")
        this.ser.connectServer(this.selfPlayer.id)
    },
    setStore(storeData) {
        this.store.createCardWall(storeData)
    },
    setInitialPlayers(players) {
        this.players = players
    },
    setMode(isStandard) {
        this.standard = isStandard
    },
    initialPlayers(playerData) {
        playerData.forEach(data => {
            console.log("set dir :"+data.dir)
            var ob = { data: null, side: null }
            ob.data = data
            switch (data.dir) {
                case Directions.East:
                    this.East = ob
                    console.log("set east")
                    break
                case Directions.South:
                    this.South = ob
                    console.log("set South")
                    break
                case Directions.West:
                    this.West = ob
                    console.log("set West")
                    break
                case Directions.North:
                    this.North = ob
                    console.log("set North")
                    break
            }
            if (data.id = this.selfPlayer.getComponent("Player").id) {// daixu
                this.selfDir = data.dir
            }
        });
        this._inistialPlayerPos()
    },
    _inistialPlayerPos() {
        switch (this.selfDir) {
            case Directions.East:
                this.East.side = Sides.Bottom
                this.South.side = Sides.Left
                this.West.side = Sides.Top
                this.North.side = Sides.Right
                break
            case Directions.South:
                this.South.side = Sides.Bottom
                this.West.side = Sides.Left
                this.North.side = Sides.Top
                this.East.side = Sides.Right
                break
            case Directions.West:
                this.West.side = Sides.Bottom
                this.North.side = Sides.North
                this.East.side = Sides.Top
                this.South.side = Sides.Right
                break
            case Directions.North:
                this.North.side = Sides.Bottom
                this.East.side = Sides.Left
                this.South.side = Sides.Top
                this.West.side = Sides.Right
                break
        }
    },
    startGame() {
    },
    cardOut(card) {
    },
    update(dt) {
    },
    _newRound() {
    },

});
