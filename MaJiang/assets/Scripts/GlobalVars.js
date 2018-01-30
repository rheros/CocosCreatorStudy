window.MaTypes = cc.Enum({
    wan: 0,
    bing: 1,
    tiao: 2,
    feng: 3,
    hua: 4
});
window.Directions = cc.Enum({
    East: 0,
    North: 1,   
    West: 2,
    South: 3
});
window.Sides=cc.Enum({
    Top:0,
    Left:1,
    Bottom:2,
    Right:3
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
window.directionToSide=function(selfdir,dir)
{
    return (2-dir-selfdir+4)%4;
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
        return "北"
        case 2:
        return "西"
        case 3:
        return "南"
        default:
        return "NullDir num is "+dir
    }
}
window.GetSideString=function(dir)
{
    switch(dir)
    {
        case 0:
        return "上"
        case 1:
        return "左"
        case 2:
        return "下"
        case 3:
        return "右"
        default:
        return "NullDir num is "+dir
    }
}
window.getMajhongTypeString=function(type)
{
    switch(type)
    {
        case 0:
        return "万"
        case 1:
        return "饼"
        case 2:
        return "条"
        case 3:
        return "风"
        case 4:
        return "花"
        default:
        return "位置麻将类型"
    }
}
window.getFengString=function(fengNum)
{
    switch(fengNum)
    {
        case 1:
        return "东"
        case 2:
        return "南"
        case 3:
        return "西"
        case 4:
        return "北"
        case 5:
        return "中"
        case 6:
        return "发"
        case 7:
        return "白"
        default:
        return "未知风头"
    }
}
window.RandomDize=function(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}