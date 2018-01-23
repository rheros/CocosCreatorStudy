window.MaTypes = cc.Enum({
    wan: 0,
    bing: 1,
    tiao: 2,
    feng: 3,
    hua: 4
});
window.Directions = cc.Enum({
    East: 0,
    South: 1,
    West: 2,
    North: 3
});
window.randomSort = function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
}

window.StoreDataPack = cc.Class({
    name: "StoreDataPack",
    actor: function () {
        cc.log("shit");
    },
    properties: {
        id: 0,
        type: 0,// bing tiao feng hua
        num: 0,
    }
})
window.PlayerDataPack = cc.Class({
    properties: {
        dir: 0,
        coins: 1000,
        winTimes: 20,
        loseTimes: 10,
        playTimes: 30,
    }
})