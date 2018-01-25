
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
            if (data.id = this.selfPlayer.getComponent("Player").id) {// daixu
                this.selfDir = data.dir
            }
            console.log("selfDir "+data.dir)
        })
        console.log("selfDir "+this.selfDir+"self id "+this.getComponent("Player").id)
        playerData.forEach(data => {
            console.log("set dir :"+data.dir)
            var ob ={ data: null, side: null,isMain:false}
            ob.data = data
            switch (data.dir) {
                case Directions.East:
                    this.East = ob
                    this.East.side=(2-this.selfDir+4)%4
                    this.store.setDirectionString(this.East.side,"东 "+data.id)
                    console.log(this.selfDir+ " set east side is "+this.East.side)
                    break
                case Directions.South:
                    this.South = ob
                    this.South.side=(3-this.selfDir+4)%4
                    this.store.setDirectionString(this.South.side,"南 "+data.id)
                    console.log(this.selfDir+" set South "+this.South.side)
                    break
                case Directions.West:
                    this.West = ob
                    this.West.side=(4-this.selfDir+4)%4
                    this.store.setDirectionString(this.West.side,"西 "+data.id)
                    console.log(this.selfDir+" set West "+this.West.side)
                    break
                case Directions.North:
                    this.North = ob
                    this.North.side=(5-this.selfDir+4)%4
                    this.store.setDirectionString(this.North.side,"北 "+data.id) 
                    console.log(this.selfDir+" set North "+this.North.side)
                    break
            }

        });
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
