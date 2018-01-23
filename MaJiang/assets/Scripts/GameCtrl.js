
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
            var ob={data:null,side:null}
                ob.data=data
            switch (data.dir) {
                case Directions.East:
                    this.East = ob
                    break
                case Directions.South:
                    this.South = ob
                    break
                case Directions.West:
                    this.West = ob
                    break
                case Directions.North:
                    this.North = ob
                    break
            }
            if (data.id = p.id) {// daixu
                this.selfDir = data.dir
            }
        });
        this._inistialPlayerPos()
    },
    _inistialPlayerPos() {
        switch (this.selfDir) {
            case Directions.East:
                this.left = this.South
                this.top = this.West
                this.right = this.North
                break
            case Directions.South:
                this.left = this.West
                this.top = this.North
                this.right = this.East
                break
            case Directions.West:
                this.left = this.North
                this.top = this.East
                this.right = this.South
                break
            case Directions.North:
                this.left = this.East
                this.top = this.South
                this.right = this.West
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
