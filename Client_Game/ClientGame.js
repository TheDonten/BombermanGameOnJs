
const Square_GameRequire = require("../src/Object_Game/Square_Game/Square_Game");
const PlayerRequire = require("../src/Object_Game/Players/Player");
const WallRequire = require("../src/Object_Game/Wall/Wall")
const CrashableWallRequire = require("../src/Object_Game/Crashable_wall/CrashableWall");
const Bombs = require("../src/Object_Game/Bombs/Bombs");
const Explosion = require("../src/Object_Game/Explosion/Explosion");
const Polygons = require("../src/Shape/Polygons");

class MeineCanvas {

    constructor(obj) {
        this.canvas_me = document.createElement("canvas")
        this.canvas_me.className = "MainGame"
        this.ctx = this.canvas_me.getContext('2d')
        obj.appendChild(this.canvas_me);
        this.canvas_me.height = 900;
        this.canvas_me.width = 1300;
    }
}

class ClientGame{
    constructor( Player, io) {
        this.io = io;
        this.Player = Player;
        this.ObjectToSend = {};

        this.live_bomb = [];
        this.live_explosion = [];
        //this.square_game = document.body;
        this.MeineCanvas = new MeineCanvas(document.body);
        this.SquareGame = new Square_GameRequire();
        this.size_height = 0;
        this.size_width = 0;
        this.keys_button = [];
        this.handler_button = this.handler_button.bind(this);
        this.start();
        io.on("CanMoveSend", (args) =>{
            this.Player.CanMoving();
        })
        io.on("DataDraw", (Field) =>{
            this.SquareGame.setPlayer(this.CreateNewArrayClass(PlayerRequire, Field.object_player));
            this.SquareGame.setWall(this.CreateNewArrayClass(WallRequire,Field.object_wall));
            this.SquareGame.setCrashableWalls(this.CreateNewArrayClass(CrashableWallRequire,Field.object_crashable_walls))
            this.SquareGame.setBombs(this.CreateNewArrayBombs(Field.bombs));
            this.SquareGame.setExplosion(this.CreateNewArrayExplosion(Field.explosion));
            this.SquareGame.draw(this.MeineCanvas.ctx);
        })
    }

    CreateNewArrayClass(TypeClass,object_Array){
        let NewArray = [];
        for(let el of object_Array){
            NewArray.push(new TypeClass(el.id, el.start_x, el.start_y, el.color));
        }
        return NewArray;
    }
    CreateNewArrayBombs(bombs){
        let NewArray = [];
        for(let el of bombs){
            let bomb = new Bombs(el.id,el.start_x,el.start_y, el.color);
            bomb.size_for_animation = el.size_for_animation;
            bomb.speed_flashing = el.speed_flashing;
            bomb.color = el.color;
            bomb.update_animation(bomb.size_for_animation, bomb.color);

            NewArray.push(bomb);
        }
        return NewArray;
    }
    CreateNewArrayExplosion(explose){
        let NewArray = [];
        for(let el of explose){
            let expl = new Explosion(el.id,el.start_x,el.start_y, el.live_explosion,el.size_explosion);
            expl.size_explosion_right = el.size_explosion_right;
            expl.size_explosion_left = el.size_explosion_left;
            expl.size_explosion_up = el.size_explosion_up;
            expl.size_explosion_down = el.size_explosion_down;
            expl.Polygon_collection[0][0] = new Polygons(expl.start_x, expl.start_y, expl.size_explosion_right, 100,4,expl.color )
            expl.Polygon_collection[1][0] = new Polygons(expl.start_x, expl.start_y, expl.size_explosion_left, 100,4,expl.color )
            expl.Polygon_collection[2][0] = new Polygons(expl.start_x, expl.start_y, 100, expl.size_explosion_up,4,expl.color )
            expl.Polygon_collection[3][0] = new Polygons(expl.start_x, expl.start_y, 100, expl.size_explosion_down,4,expl.color )
            expl.current_animation_size = el.current_animation_size;
            expl.update_Polygons_animations();
            NewArray.push(expl);
        }
        return NewArray;
    }

    start(){
        if(this.CanMove)
            return;
        document.addEventListener('keyup', this.handler_button);
        document.addEventListener('keydown', this.handler_button);
        this.CanMove = true;
    }

    stop(){
        if(!this.CanMove)
            return;
        document.removeEventListener('keyup', this.handler_button);
        document.removeEventListener('keydown', this.handler_button);
        this.CanMove = false;
    }

    handler_button(event){
        //this.stop();
        if(event.type === "keydown"){
            //console.log('keydown')
            if(this.keys_button[event.code]) return;
            this.keys_button[event.code] = true;
            setTimeout( this.UpdateData({id: this.Player.id, PlayerButton : this.update(), isMove : true}), 30);
            //this.UpdateData({id: this.Player.id, PlayerButton : this.update()});
        }
        else if(event.type === "keyup"){
            //console.log('keyup')
            this.keys_button[event.code] = false;
            setTimeout( this.UpdateData({id: this.Player.id, PlayerButton : this.update(), isMove : false}), 30);
        }
        //console.log({id: this.Player.id, PlayerButton : this.update()});

    }

    UpdateData(obj){
        this.ObjectToSend = obj;
        //console.log("Data was updated")
        this.SendData();
    }

    SendData(){
        this.io.emit( "SendDataServer", this.ObjectToSend);
        //console.log("Data was send")
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

module.exports = ClientGame;