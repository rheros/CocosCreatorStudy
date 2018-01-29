
cc.Class({
    extends: cc.Component,

    properties: {
        Player: cc.Node,
        selfDir: 0,

        East:
            {
                default: null,
                type: Object,
                visible: false
            },
        South: {
            default: null,
            type: Object,
            visible: false
        },
        West: {
            default: null,
            type: Object,
            visible: false
        },
        North: {
            default: null,
            type: Object,
            visible: false
        },

    },
    // LIFE-CYCLE CALLBACKS:
    onLoad() {

        this.selfPlayer = this.getComponent("Player")
        //set desk data
        this.store = this.getComponent("CardStore")
        this.store.gameCtrl = this
        this.store.cleanDesk()
        this.serv = this.getComponent("Main")
        this.serv.connectServer(this.selfPlayer.id)
    },
    setStore(storeData) {
        this.store.createCardWall(storeData)
    },
    initialPlayerCards(playersData) {
        this.store.initialHandCards(playersData)
    },
    setInitialPlayers(players) {
        this.players = players
    },
    setMode(isStandard) {
        this.standard = isStandard
    },
    initialPlayers(playerData) {
        playerData.forEach(data => {
            if (data.id == this.selfPlayer.getComponent("Player").id) {// daixu
                this.selfDir = data.dir
            }
        })
        console.log("selfDir " + GetDirString(this.selfDir) + "self id " + this.getComponent("Player").id)
        playerData.forEach(data => {
            console.log("set dir :" + GetDirString(data.dir) + " and id is" + data.id)
            var ob = { data: null, side: null, isMain: false }
            ob.data = data
            switch (data.dir) {
                case Directions.East:
                    this.East = ob
                    this.East.side = directionToSide(this.selfDir, 0)
                    this._setDisplayString(this.East)
                    break
                case Directions.North:
                    this.North = ob
                    this.North.side = directionToSide(this.selfDir, 3)
                    this._setDisplayString(this.North)
                    break
                case Directions.West:
                    this.West = ob
                    this.West.side = directionToSide(this.selfDir, 2)
                    this._setDisplayString(this.West)
                    break
                case Directions.South:
                    this.South = ob
                    this.South.side = directionToSide(this.selfDir, 1)
                    this._setDisplayString(this.South)
                    break
            }
        });
    },
    _setDisplayString(obj) {
        console.log("obj side" +GetSideString(obj.side)+" dir "+obj.data.dir)
        var storProx = this.store.deskPosProxy[obj.side].getComponent("StoreProxyCtrl")
        storProx.setDirectionString(obj.data.dir)
        storProx.setPlayerId(obj.data.id)
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
