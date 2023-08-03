// import Player from "../src/Object_Game/Players/Player";
// import Wall from "../src/Object_Game/Wall/Wall";
// import CrashableWall from "../src/Object_Game/Crashable_wall/CrashableWall";
// import Square_Game from "../src/Object_Game/Square_Game/Square_Game";
// import RGB from "../src/RGB/RGB";
const PlayerRequire = require("../src/Object_Game/Players/Player");
const Square_GameRequire = require("../src/Object_Game/Square_Game/Square_Game");
const WallRequire = require("../src/Object_Game/Wall/Wall")
const CrashableWallRequire = require("../src/Object_Game/Crashable_wall/CrashableWall");
const UpdatePlayers = require("./Choose_Move_Player");
const Choose_Move_Player = require("./Choose_Move_Player");
const Choose_Plant_Bomb = require("./Choose_Plant_Bomb");
const Update_Status_Player = require("./UpdateStatusPlayer");
const check_Explose_Collision = require('./CheckExploseCollision');

const RGBRequire = require("../src/RGB/RGB");
const Explosion = require("../src/Object_Game/Explosion/Explosion");
const rgb = require("../src/RGB/RGB");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const milisec = 30;

const player_init = {
    id : 0,
    start_x : 0,
    start_y : 0,
    color : 0,
    Update : {
        do_it: false,
        KeyD: false,
        KeyA: false,
        KeyS: false,
        KeyW: false,
        Escape: false,
        Space: false
    }
}

class Server_loop {
    constructor() {
        this.Players_observ = [];
        this.Players = new Map();
        this.Square_Game = new Square_GameRequire();
        this.Square_Game.init_square();
        this.isPlaying = false;
        this.Walls = [];
        this.CrashableWalls = []
        this.live_bomb = [];
        this.live_explosion = [];
        this.Sockets_Playing = [];
        this.One_check = true;
    }

    setSocketPlayer(Sockets_Playing){
        this.Sockets_Playing = Sockets_Playing;
        for(let i of this.Sockets_Playing.keys()){
            i.on("SendDataServer", (args) => {
                if(this.Players.has(args.id)){
                    this.Players.get(args.id).PlayerButton = args.PlayerButton;
                    this.Players.get(args.id).is_update = true;
                }
            })
            i.on("InitDataServer", (args)=>{
                this.Players.set(args.id, new PlayerRequire(args.id, args.start_x, args.start_y, args.color));
            })
        }
    }

    getSquare(i, j) {
        //console.log(this.Square_Game.squares_cell);
        return this.Square_Game.squares_cell[i][j];
    }

    init() {
        let color_wall = "#000eff";
        let color_crashable = "#19813d";
        let create_map = [[{i: 0, j: 0, type: "Player"}, {i: 0, j: 1, type: "clear"}, {i: 0, j: 2, type: "clear"}, {
            i: 0, j: 3, type: "clear"
        }, {i: 0, j: 4, type: "clear"}, {i: 0, j: 5, type: "Wall"}, {i: 0, j: 6, type: "CrashableWall"}, {
            i: 0, j: 7, type: "CrashableWall"
        }, {i: 0, j: 8, type: "clear"}, {i: 0, j: 9, type: "CrashableWall"}, {i: 0, j: 10, type: "clear"}, {
            i: 0, j: 11, type: "CrashableWall"
        }, {i: 0, j: 12, type: "CrashableWall"}], [{i: 1, j: 0, type: "clear"}, {i: 1, j: 1, type: "Wall"}, {
            i: 1,
            j: 2,
            type: "CrashableWall"
        }, {
            i: 1, j: 3, type: "Wall"
        }, {i: 1, j: 4, type: "clear"}, {i: 1, j: 5, type: "Wall"}, {i: 1, j: 6, type: "clear"}, {
            i: 1, j: 7, type: "Wall"
        }, {i: 1, j: 8, type: "clear"}, {i: 1, j: 9, type: "Wall"}, {i: 1, j: 10, type: "clear"}, {
            i: 1, j: 11, type: "Wall"
        }, {i: 1, j: 12, type: "CrashableWall"}], [{i: 2, j: 0, type: "clear"}, {i: 2, j: 1, type: "clear"}, {
            i: 2,
            j: 2,
            type: "clear"
        }, {
            i: 2, j: 3, type: "clear"
        }, {i: 2, j: 4, type: "clear"}, {i: 2, j: 5, type: "clear"}, {i: 2, j: 6, type: "clear"}, {
            i: 2, j: 7, type: "clear"
        }, {i: 2, j: 8, type: "clear"}, {i: 2, j: 9, type: "clear"}, {i: 2, j: 10, type: "clear"}, {
            i: 2, j: 11, type: "clear"
        }, {i: 2, j: 12, type: "clear"}], [{i: 3, j: 0, type: "CrashableWall"}, {i: 3, j: 1, type: "Wall"}, {
            i: 3,
            j: 2,
            type: "clear"
        }, {
            i: 3, j: 3, type: "Wall"
        }, {i: 3, j: 4, type: "CrashableWall"}, {i: 3, j: 5, type: "Wall"}, {i: 3, j: 6, type: "clear"}, {
            i: 3, j: 7, type: "Wall"
        }, {i: 3, j: 8, type: "CrashableWall"}, {i: 3, j: 9, type: "Wall"}, {i: 3, j: 10, type: "clear"}, {
            i: 3, j: 11, type: "Wall"
        }, {i: 3, j: 12, type: "clear"}], [{i: 4, j: 0, type: "clear"}, {i: 4, j: 1, type: "clear"}, {
            i: 4,
            j: 2,
            type: "clear"
        }, {
            i: 4, j: 3, type: "clear"
        }, {i: 4, j: 4, type: "clear"}, {i: 4, j: 5, type: "clear"}, {i: 4, j: 6, type: "clear"}, {
            i: 4, j: 7, type: "CrashableWall"
        }, {i: 4, j: 8, type: "CrashableWall"}, {i: 4, j: 9, type: "CrashableWall"}, {
            i: 4, j: 10, type: "clear"
        }, {i: 4, j: 11, type: "CrashableWall"}, {i: 4, j: 12, type: "clear"}], [{
            i: 5,
            j: 0,
            type: "CrashableWall"
        }, {i: 5, j: 1, type: "Wall"}, {i: 5, j: 2, type: "clear"}, {
            i: 5, j: 3, type: "Wall"
        }, {i: 5, j: 4, type: "clear"}, {i: 5, j: 5, type: "Wall"}, {i: 5, j: 6, type: "clear"}, {
            i: 5, j: 7, type: "Wall"
        }, {i: 5, j: 8, type: "CrashableWall"}, {i: 5, j: 9, type: "Wall"}, {i: 5, j: 10, type: "clear"}, {
            i: 5, j: 11, type: "Wall"
        }, {i: 5, j: 12, type: "clear"}], [{i: 6, j: 0, type: "clear"}, {i: 6, j: 1, type: "clear"}, {
            i: 6,
            j: 2,
            type: "clear"
        }, {
            i: 6, j: 3, type: "clear"
        }, {i: 6, j: 4, type: "clear"}, {i: 6, j: 5, type: "CrashableWall"}, {
            i: 6, j: 6, type: "CrashableWall"
        }, {i: 6, j: 7, type: "clear"}, {i: 6, j: 8, type: "clear"}, {i: 6, j: 9, type: "clear"}, {
            i: 6, j: 10, type: "clear"
        }, {i: 6, j: 11, type: "CrashableWall"}, {i: 6, j: 12, type: "clear"}], [{i: 7, j: 0, type: "clear"}, {
            i: 7,
            j: 1,
            type: "Wall"
        }, {i: 7, j: 2, type: "Wall"}, {
            i: 7, j: 3, type: "Wall"
        }, {i: 7, j: 4, type: "clear"}, {i: 7, j: 5, type: "Wall"}, {i: 7, j: 6, type: "clear"}, {
            i: 7, j: 7, type: "Wall"
        }, {i: 7, j: 8, type: "clear"}, {i: 7, j: 9, type: "Wall"}, {i: 7, j: 10, type: "CrashableWall"}, {
            i: 7, j: 11, type: "Wall"
        }, {i: 7, j: 12, type: "clear"}], [{i: 8, j: 0, type: "clear"}, {i: 8, j: 1, type: "clear"}, {
            i: 8,
            j: 2,
            type: "clear"
        }, {
            i: 8, j: 3, type: "CrashableWall"
        }, {i: 8, j: 4, type: "clear"}, {i: 8, j: 5, type: "clear"}, {i: 8, j: 6, type: "CrashableWall"}, {
            i: 8, j: 7, type: "clear"
        }, {i: 8, j: 8, type: "clear"}, {i: 8, j: 9, type: "clear"}, {i: 8, j: 10, type: "CrashableWall"}, {
            i: 8, j: 11, type: "clear"
        }, {i: 8, j: 12, type: "Player"}],]

        let square = [];
        let wall = [];
        let crashableWall = [];

        for (let row of create_map) {
            for (let coll of row) {
                if (coll.type === "Player") {
                    square = this.getSquare(coll.j, coll.i);
                    //console.log(coll)
                    let color = RGBRequire(50 + (10*coll.i), 50 + (10* coll.i), 50 + (10* coll.i));

                    player_init.id = coll.i + coll.j;
                    player_init.start_x = square.start_x;
                    player_init.start_y = square.start_y;
                    player_init.player_bomb = 100;
                    player_init.color = color;
                    this.Players_observ.push({...player_init});
                } else if (coll.type === "Wall") {
                    square = this.getSquare(coll.j, coll.i);
                    wall = new WallRequire(0, square.start_x, square.start_y, color_wall);
                    this.Square_Game.squares_cell[coll.j][coll.i].type = "wall";
                    this.Square_Game.setWall(wall);
                    this.Walls.push(wall);
                } else if (coll.type === "CrashableWall") {
                    square = this.getSquare(coll.j, coll.i);
                    //console.log(coll)
                    this.Square_Game.squares_cell[coll.j][coll.i].type = "CrashableWall";
                    crashableWall = new CrashableWallRequire(0, square.start_x, square.start_y, color_crashable)
                    crashableWall.cell_coord = square;
                    this.CrashableWalls.push(crashableWall);
                }
            }
        }

        this.Square_Game.setCrashableWalls(this.CrashableWalls);
        this.Square_Game.setWall(this.Walls);
        this.Square_Game.setPlayer(this.Players_observ);
        this.isPlaying = true;
    }

    GetAllData(){

    }

    Update_Players() {

        for (const i of this.Players_observ) {

            let player = this.Players.get(i.id);

            if(player === undefined)
                continue;

            let flags = player.PlayerButton;
            //debugger;
            if (!flags.do_it) {
                continue;
            }

            if (flags.Escape) {
                this.playing_match = false;
                continue;
            }

            Choose_Move_Player(player, flags,this.Walls,this.live_bomb,this.CrashableWalls, this.MapToArray(this.Players));
            Choose_Plant_Bomb(player, flags, this.live_bomb, this.Square_Game);
            Update_Status_Player(player);



            //Update_Status_Player(player);

        }
        //this.CanMoveSend();
        //console.log("All Player Updated");
    }

    CanMoveSend(){
        for(let i of this.Sockets_Playing.keys()){
           // console.log("Player id:" + this.Sockets_Playing.get(i).Player.id + "You Can Move");
            i.emit("CanMoveSend", true);
        }
    }

    sendUpdates(){

    }
    Update_Explose() {
        if (this.live_explosion.length < 1)
            return;
        if (this.live_explosion[0].time_left_live <= 0) {
            this.live_explosion.shift();
            console.log("Explosion is done")
            //this.live_explosion.push(new Explosion(temp.id,temp.x,temp.y, temp.live_explosion,temp.size_explosion));
        }

        for (let i = 0; i < this.live_explosion.length; i++) {
            this.live_explosion[i].time_left_live -= milisec / 1000;
            check_Explose_Collision(this.live_explosion[i],this.Walls,this.MapToArray(this.Players),this.live_bomb,this.CrashableWalls, this.Players);
            if (this.live_explosion[i].time_left_live < this.live_explosion[i].time_live / 2) {
               //console.log(this.live_explosion[i].current_animation_size -= 0.125 / (this.live_explosion[i].time_live / 0.5))
               // this.live_explosion[i].current_animation_size -= 0.125 / (this.live_explosion[i].time_live / 0.5);
                this.live_explosion[i].current_animation_size -= 2 / (this.live_explosion[i].time_live / 0.03)
               // this.live_explosion[i].current_animation_size -= 2 / (this.live_explosion[i].time_live / 2);
                //this.live_explosion[i].update_Polygons_animations();

            } else {
                //this.live_explosion[i].current_animation_size += 0.125 / (this.live_explosion[i].time_live / 0.5);
                this.live_explosion[i].current_animation_size += 2 / (this.live_explosion[i].time_live / 0.03)
                //this.live_explosion[i].update_Polygons_animations();
            }
        }
    }

    Update_Bombs(){
        if (this.live_bomb.length < 1)
            return;
        if (this.live_bomb[0].time_left_live <= 0) {
            const temp = this.live_bomb.shift();

            temp.cell_coord.type = "clear";

            let explose = new Explosion(temp.id, temp.start_x, temp.start_y, temp.live_explosion, temp.size_explosion)
            check_Explose_Collision(explose,this.Walls,this.MapToArray(this.Players),this.live_bomb,this.CrashableWalls,this.Players);

            //this.live_explosion.push(new Explosion(temp.id, temp.x + (this.size_width / 40) + (this.size_height / 105), temp.y + (this.size_height/20) + (this.size_height / 105), temp.live_explosion, temp.size_explosion));
            this.live_explosion.push(explose);
           this.Square_Game.setExplosion(this.live_explosion);
        }
        for (let i = 0; i < this.live_bomb.length; i++) {

            this.live_bomb[i].time_left_live -= milisec / 1000;
            //let time_left = bomb.time_live;
            //console.log(this.live_bomb[i].time_live / (milisec / 1000))
            if (this.live_bomb[i].time_left_live <= 1) {
                // this.live_bomb[i].size_for_animation += (milisec / 1000);
                //this.live_bomb[i].size_for_animation += (4 / (33* this.live_bomb[i].time_live)) / 2;
                this.live_bomb[i].size_for_animation += 0.04;
                this.live_bomb[i].speed_flashing += 1;
                this.live_bomb[i].color = rgb(180 + (3 * this.live_bomb[i].speed_flashing), 142, 0)
                //this.live_bomb[i].update_animation(this.live_bomb[i].size_for_animation,this.live_bomb[i].color)

            }
        }
    }


    MapToArray(MapJs){
        let NewArray = [];
        for(const el of MapJs.values()){
            NewArray.push(el);
        }
        return NewArray;
    }

    SendDataToDraw(){
        this.Square_Game.setPlayer(this.MapToArray(this.Players));
        this.Square_Game.setBombs(this.live_bomb);
        this.Square_Game.setExplosion(this.live_explosion);

        for(let i of this.Sockets_Playing.keys()){
            i.emit("DataDraw", this.Square_Game);
        }
    }

    async Playing(){
        while(this.isPlaying){
            //this.GetAllData()
            this.Update_Players();
            this.Update_Bombs();
            this.Update_Explose();
            this.SendDataToDraw();
            await sleep(30);

        }
    }
}

module.exports = Server_loop;