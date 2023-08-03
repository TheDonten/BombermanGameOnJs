
const PlayerRequire = require("../src/Object_Game/Players/Player");
const check_collision_square =  require("../Server/check_collision_square");
const Create_Check_To_Collision = require("../Server/Create_Check_To_Collision");
const check_collision = require("../Server/check_collision");

function check_result(){

}




function Choose_Move_Player(player, flags, Walls, live_bomb,CrashableWalls, players) {
    let temp_player = new PlayerRequire(132131232131,player.start_x,player.start_y,player.bombs, player.color);

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
        if (!check_collision_square(player.start_x, player.start_y - 10, "minus")) {
            temp_player.Player_Update_coord(player.start_x,player.start_y - 10);
            let check_to_collision = Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
            let result = check_collision(temp_player.Polygons, check_to_collision);
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
                player.Player_Update_coord(player.start_x, player.start_y - 10);
            }
        }
    }
    if (flags.KeyS) {
        if (!check_collision_square(player.start_x, player.start_y + 10, "plus")) {
            temp_player.Player_Update_coord(player.start_x,player.start_y + 10);

            let check_to_collision = this.Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
            let result = check_collision(temp_player.Polygons, check_to_collision);
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
                player.Player_Update_coord(player.start_x, player.start_y + 10);
            }
        }
    }
    if (flags.KeyA) {
        if (!check_collision_square(player.start_x - 10, player.start_y, "minus")) {
            temp_player.Player_Update_coord(player.start_x - 10,player.start_y);
            let check_to_collision = Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
            let result = check_collision(temp_player.Polygons, check_to_collision);
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
                player.Player_Update_coord(player.start_x - 10, player.start_y);
            }
        }
    }
    if (flags.KeyD) {
        if (!check_collision_square(player.start_x + 10, player.start_y, "plus")) {
            temp_player.Player_Update_coord(player.start_x + 10,player.start_y);
            let check_to_collision = Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
            let result = check_collision(temp_player.Polygons, check_to_collision);
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
                player.Player_Update_coord(player.start_x + 10, player.start_y);
            }
        }
    }
}

module.export = Choose_Move_Player;