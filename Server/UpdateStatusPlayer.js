const milisec = 30;

module.exports = function Update_Status_Player(player) {
    if (player.planting) {
        //debugger;

        if (player.player_bomb_cooldown - player.player_bomb_cooldown_left <= 0) {
            console.log("Sec");
            player.player_bomb_cooldown_left = 0;
            player.planting = false;
        }
        player.player_bomb_cooldown_left += milisec / 1000;
    }
}