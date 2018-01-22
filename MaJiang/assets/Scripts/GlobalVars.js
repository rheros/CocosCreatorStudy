window.MaTypes=cc.Enum({
    wan: 0,
    bing: 1,
    tiao: 2,
    feng: 3,
    hua: 4
});
window.randomSort=function(a, b){
    return Math.random() > 0.5 ? -1 : 1;
    }

window.StoreDataPack=cc.Class({
        name: "StoreDataPack",
        actor: function () {
            cc.log("shit");
        },
        properties: {
            
            id: 0,
            type:0,// bing tiao feng hua
            num: 0,
        }
    })
    