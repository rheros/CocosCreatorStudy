
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
            var ob = { data: null, side: null,isMain:false}
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
        this.East.side=(2-this.selfDir+4)%4
        this.South.side=(3-this.selfDir+4)%4
        this.West.side=(4-this.selfDir+4)%4
        this.North.side=(5-this.selfDir+4)%4

        this.store.setDirectionString(this.East.side,"East4")
        this.store.setDirectionString(this.South.side,"South33")
        this.store.setDirectionString(this.West.side,"West1")
        this.store.setDirectionString(this.North.side,"North2")
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
