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
window.Sides=cc.Enum({
    Up:0,
    Right:1,
    Bottom:2,
    Left:3
})
window.randomSort = function (a, b) {
    return Math.random() >0.5 ? -1 : 1;
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
        inStore:true
    }
})
window.directionToSide(selfdir,dir)
{
    return (2+dir-selfDir+4)%4
}
window.PlayerDataPack = cc.Class({
    properties: {
        isMain:false,
        isActive:false,
        id:0,
        coins: 1000,
        winTimes: 20,
        loseTimes: 10,
        playTimes: 30,
        dir: 0,
        bing:[],
        wan:[],
        tiao:[],
        feng:[],
        hua:[],
        chi:[],
        gang:[],
        peng:[],
        cards:[]
    }
})
window.GetDirString=function(dir)
{
    switch(dir)
    {
        case 0:
        return "东"
        case 1:
        return "南"
        case 2:
        return "西"
        case 3:
        return "北"
        default:
        return "NullDir num is "+dir
    }
}