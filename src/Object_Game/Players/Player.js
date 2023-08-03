
// import Update from "/src/Update_extends/Update"
// import Polygon from "../../Shape/Polygons";
const Polygon = require("../../Shape/Polygons");
const Update = require("../../Update_extends/Update")

class PlayerCell extends Polygon{
    constructor(x,y,width,height,count_sides,color) {
        super(x,y,width,height,count_sides,color);
    }
}

class Player extends Update {
    constructor(number, x, y,player_color) {
        super();
        this.name = "Deb4ik"
        this.id = number;
        this.start_x = x;
        this.start_y = y;
        this.player_width = 100;
        this.player_heigth = 100;
        this.PushNotification = {};
        this.center_x = Math.floor(this.start_x + this.player_width/2)
        this.center_y = Math.floor(this.start_y + this.player_heigth/2)

        this.type = "Player";
        this.PlayerButton = [];
        //debugger;
        this.color = player_color;
        this.player_bomb = 100;
        this.player_bomb_cooldown = 0.5;
        this.player_bomb_cooldown_left = 0;
        this.keys_button = {};
        this.InPlantBombs = [];
        this.planting = false;
        this.is_update = false;
        this.Polygons = new PlayerCell(this.start_x,this.start_y,this.player_width,this.player_heigth,4,this.color);
        this.CanMove = true;

    }


    setObserver(obj){
        this.PushNotification = obj;
    }

    CanMoving(){
        this.start();
    }

    Player_Update_coord(x,y){
        this.start_x = x;
        this.start_y = y;
        this.center_x = Math.floor(this.start_x + this.player_width/2)
        this.center_y = Math.floor(this.start_y + this.player_heigth/2)

        this.Polygons.update_coord(this.start_x,this.start_y);

    }
    isPressed(keyCode) {
        return this.keys_button[keyCode] || false;
    }

    update() {
        // let flags = {
        //     do_it: false,
        //     KeyD: false,
        //     KeyA: false,
        //     KeyS: false,
        //     KeyW: false,
        //     Escape: false,
        //     Space: false
        // }
        // //let flags = [false, false, false, false, false, false, false];
        // if (this.isPressed("KeyD")) {
        //     flags.KeyD = true;
        //     flags.do_it = true;
        // }
        // if (this.isPressed("KeyA")) {
        //     flags.KeyA = true;
        //     flags.do_it = true;
        // }
        // if (this.isPressed("KeyS")) {
        //     flags.KeyS = true;
        //     flags.do_it = true;
        // }
        // if (this.isPressed("KeyW")) {
        //     flags.KeyW = true;
        //     flags.do_it = true;
        // }
        // if (this.isPressed("Escape")) {
        //     flags.Escape = true;
        //     flags.do_it = true;
        // }
        // if (this.isPressed("Space")) {
        //     flags.Space = true;
        //     flags.do_it = true;
        // }
        // return flags;
    }
}

// export default Player;

module.exports = Player;