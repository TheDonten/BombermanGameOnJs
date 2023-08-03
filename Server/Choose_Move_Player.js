
const PlayerRequire = require("../src/Object_Game/Players/Player");
const check_collision_square =  require("../Server/check_collision_square");
const Create_Check_To_Collision = require("./Create_Check_To_Collision");
const check_collision = require("../Server/check_collision");

function movePlayer(player,temp_player,Object_to_check, x,y,type){
    if (!check_collision_square(player.start_x + x, player.start_y + y, type)) {
        temp_player.Player_Update_coord(player.start_x + x,player.start_y + y);
        let check_to_collision = Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 300);
        let result = check_collision(temp_player, check_to_collision);
        let may = true;
        for(let elem of result){
            if(elem[0].overlap > 0 && player.InPlantBombs.includes(elem[1])){
                may = true;
            }
            else if(elem[0].overlap === 0)
                may = true;
            else if(elem[0].overlap > 0) {
                may = false;
                break;
            }
        }
        if(may){
            player.Player_Update_coord(player.start_x  + x, player.start_y + y);
        }
    }
}

module.exports = function Choose_Move_Player(player, flags, Walls, live_bomb,CrashableWalls, players) {
    //Можно упростить все
    let temp_player = new PlayerRequire(132131232131,player.start_x,player.start_y, player.color);
    temp_player.InPlantBombs = player.InPlantBombs;
    let Object_to_check = [].concat(Walls);
    for(let i of live_bomb) {
        Object_to_check.push(i);
    }
    for(let i of CrashableWalls){
        Object_to_check.push(i);
    }
    for(let i of players){
        if(player.id === i.id)
            continue;
        Object_to_check.push(i);
    }

    if (flags.KeyW) {
        movePlayer(player,temp_player,Object_to_check,0, -10, "minus");
    }
    if (flags.KeyS) {
        movePlayer(player,temp_player,Object_to_check,0, 10, "plus");
    }
    if (flags.KeyA) {
        movePlayer(player,temp_player,Object_to_check,-10, 0, "minus");
    }
    if (flags.KeyD) {
        movePlayer(player,temp_player,Object_to_check,10, 0, "plus");
    }
}

