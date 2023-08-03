// import Player from "../src/Object_Game/Players/Player";
// import Wall from "../src/Object_Game/Wall/Wall";
// import CrashableWall from "../src/Object_Game/Crashable_wall/CrashableWall";
// import Bombs from "../src/Object_Game/Bombs/Bombs";

const Create_Check_To_Collision = require("./Create_Check_To_Collision");
const PlayerClass = require("../src/Object_Game/Players/Player");
//const Square_GameRequire = require("../src/Object_Game/Square_Game/Square_Game");
const WallClass = require("../src/Object_Game/Wall/Wall")
const CrashableWallClass = require("../src/Object_Game/Crashable_wall/CrashableWall");
const BombsClass = require("../src/Object_Game/Bombs/Bombs");
const check_collision = require("../Server/check_collision");
const Polygons = require("../src/Shape/Polygons");

function getPlayerFromId(id, Players){
    for(let i of Players){
        if(i.id === id)
            return i;
    }
    return -1;
}

function getCrashalbeWall(result, CrashableWalls){
    for(let i = 0; i < CrashableWalls.length; i++){
        if(result.center_x === CrashableWalls[i].center_x && result.center_y === CrashableWalls[i].center_y)
            return i;
    }
    return -1;
}

function update_size_explose(polygon,explose,result){
    if(polygon[1] === "right") {
        explose.size_explosion_right = Math.abs(result[1].start_x - polygon[0].start_x);
        polygon[0] = new Polygons(explose.start_x, explose.start_y, explose.size_explosion_right, 100,4,explose.color )
    }
    else if(polygon[1] === "left"){
        explose.size_explosion_left = -Math.abs(result[1].start_x - polygon[0].start_x) + 100; //на самом деле 100 это ширина клетки
        polygon[0] = new Polygons(explose.start_x, explose.start_y, explose.size_explosion_left, 100,4,explose.color )
    }
    else if(polygon[1] === "up"){
        explose.size_explosion_up = -Math.abs(result[1].start_y - polygon[0].start_y)  + 100;
        polygon[0] = new Polygons(explose.start_x, explose.start_y, 100, explose.size_explosion_up,4,explose.color )
    }
    else if(polygon[1] === "down"){
        explose.size_explosion_down = Math.abs(result[1].start_y - polygon[0].start_y);
        polygon[0] = new Polygons(explose.start_x, explose.start_y, 100, explose.size_explosion_down,4,explose.color )
    }
}

module.exports = function check_Explose_Collision(explose, Walls, Players,live_bomb, CrashableWalls, PlayerMap){

    let object_to_check = [].concat(Walls);

    for(let i of Players){
        object_to_check.push(i)
    }
    for(let i of live_bomb){
        object_to_check.push(i)
    }
    for(let i of CrashableWalls){
        object_to_check.push(i);
    }
    //console.log(explose.Polygon_collection)
    for(let polygon of explose.Polygon_collection) {
        //console.log(object_to_check);
        let check_to_collision = Create_Check_To_Collision(polygon[0], object_to_check, 1000);
        let result = check_collision(polygon[0], check_to_collision);
        for(let res of result) {
            if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof PlayerClass) {
                let player = getPlayerFromId(res[1].id, Players);
                //console.log(player);
                if (player.id !== -1){
                    Players.splice(player.id, 1);
                    PlayerMap.delete(player.id);
                    console.log("Player Dead");
                }

                break;

            } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof WallClass) {
                update_size_explose(polygon, explose, res)
                break;

            } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof CrashableWallClass) {
                update_size_explose(polygon, explose, res)
                let index = getCrashalbeWall(res[1], CrashableWalls);//Здесь нужна проверка, могут быть проблемы.
                CrashableWalls[index].cell_coord.type = "clear";
                CrashableWalls.splice(index, 1);

                break;
            } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof BombsClass) {
                update_size_explose(polygon, explose, res)
                break;
            }
        }
    }
}