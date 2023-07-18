
import Update from "/src/Update_extends/Update"
import Polygon from "../../Shape/Polygons";

class PlayerCell extends Polygon{
    constructor(x,y,width,height,count_sides,color) {
        super(x,y,width,height,count_sides,color);
    }
}

class Player extends Update {
    constructor(number, x, y, bombs,player_color) {
        super();
        this.name = "Deb4ik"
        this.id = number;
        this.start_x = x;
        this.start_y = y;
        this.player_width = 100;
        this.player_heigth = 100;

        this.center_x = Math.floor(this.start_x + this.player_width/2)
        this.center_y = Math.floor(this.start_y + this.player_heigth/2)

        this.type = "Player";
        //debugger;
        this.player_color = player_color;
        this.player_bomb = bombs;
        this.player_bomb_cooldown = 1;
        this.player_bomb_cooldown_left = 0;
        this.keys_button = {};
        this.InPlantBombs = [];
        this.planting = false;
        this.is_update = false;
        document.addEventListener('keyup', (function (e) {

            this.keys_button[e.code] = false;
            this.is_update = true;
        }).bind(this));
        document.addEventListener('keydown', (function (e) {
            this.keys_button[e.code] = true;
            this.is_update = true;
        }).bind(this));
        this.Polygons = new PlayerCell(this.start_x,this.start_y,this.player_width,this.player_heigth,4,this.player_color);
    }

    find_plant_bomb(bomb){

        for(let el in this.Player_Bombs){
            if(el === bomb)
                return true;
        }
        return false;
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
        let flags = {
            do_it: false,
            KeyD: false,
            KeyA: false,
            KeyS: false,
            KeyW: false,
            Escape: false,
            Space: false
        }
        //let flags = [false, false, false, false, false, false, false];
        if (this.isPressed("KeyD")) {
            flags.KeyD = true;
            flags.do_it = true;
        }
        if (this.isPressed("KeyA")) {
            flags.KeyA = true;
            flags.do_it = true;
        }
        if (this.isPressed("KeyS")) {
            flags.KeyS = true;
            flags.do_it = true;
        }
        if (this.isPressed("KeyW")) {
            flags.KeyW = true;
            flags.do_it = true;
        }
        if (this.isPressed("Escape")) {
            flags.Escape = true;
            flags.do_it = true;
        }
        if (this.isPressed("Space")) {
            flags.Space = true;
            flags.do_it = true;
        }
        return flags;
    }
}

export default Player;