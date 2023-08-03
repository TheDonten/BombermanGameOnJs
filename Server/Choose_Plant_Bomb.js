const Bombs = require("../src/Object_Game/Bombs/Bombs");
const Choose_Square_To_Plant = require("./ChooseSquareToPlant");
const check_collision = require("../Server/check_collision");

module.exports = function Choose_Plant_Bomb(player, flags, live_bomb,Square_Game) {
    if (!flags.Space || player.player_bomb <= 0 || player.planting)
        return;
    let new_bomb = new Bombs(live_bomb.length, player.start_x, player.start_y)
    let check_planting_bomb = check_collision(new_bomb, live_bomb);
    if(check_planting_bomb.length !== 0 && check_planting_bomb[0][0].overlap > 0){
        return;
    }
    player.player_bomb -= 1;
    player.planting = true;

    let result = check_collision(player, [new_bomb]);

    if(result[0][0].overlap > 0) {
        player.InPlantBombs.push(new_bomb);
        //console.log(player.InPlantBombs);
    }
    // new_bomb.Player_Parent = player;
    Choose_Square_To_Plant(new_bomb,Square_Game)
    live_bomb.push(new_bomb)

    //Square_Game.setBombs(this.live_bomb);
}