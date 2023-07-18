import {getRandom} from "./getRandom";
import Player from "./Object_Game/Players/Player";
import Square_Game from "./Object_Game/Square_Game/Square_Game";
import Wall from "./Object_Game/Wall/Wall";
import GetCollision from "./Colisision/GetCollision";
import Bombs from "./Object_Game/Bombs/Bombs";
import rgb from "./RGB/RGB";
import Polygons from "./Shape/Polygons";
import Explosion from "./Object_Game/Explosion/Explosion";
import CrashableWall from "./Object_Game/Crashable_wall/CrashableWall";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const milisec = 30;


class Meine_Spiele {
    constructor() {
        //this.keys = {};
        this.Players_observ = [];
        this.playing_match = false;
        this.Canvas = {};
        this.update_move = false;
        this.square_game = document.body;
        this.size_height = 0;
        this.size_width = 0;
        this.intervalId = "";
        this.live_bomb = [];
        this.live_explosion = [];
        this.squares = []
        this.Square_Game = new Square_Game;
        this.Walls = [];
        this.CrashableWalls = [];
        this.timer = 0;

    }


    get_random_free_square(){
        let y,x;
        while(true){
            [x, y] = [getRandom(this.size_width / 100 - 1), getRandom(this.size_height / 100 - 1)]

            if(this.Square_Game.squares_cell[x][y].type === "clear"){
                return  this.Square_Game.squares_cell[x][y];
            }
        }
    }

    getSquare(i,j){
        //console.log(this.Square_Game.squares_cell);
        return this.Square_Game.squares_cell[i][j];
    }

    player_init(Count_connect = 1) {

        for (let i = 0; i < Count_connect; i++) {
            let square = this.get_random_free_square();

            this.Players_observ.push(new Player(i, square.start_x, square.start_y, 5,"#b00b0b"));
        }
    }
    init(){
        let color_wall = "#000eff";
        let color_crashable ="#19813d";
        let create_map = [
            [{i:0,j:0, type: "Player"},{i:0,j:1, type: "clear"},{i:0,j:2, type: "clear"},{i:0,j:3, type: "clear"},{i:0,j:4, type: "clear"},{i:0,j:5, type: "Wall"},{i:0,j:6, type: "CrashableWall"},{i:0,j:7, type: "CrashableWall"},{i:0,j:8, type: "clear"},{i:0,j:9, type: "CrashableWall"},{i:0,j:10, type: "clear"},{i:0,j:11, type: "CrashableWall"},{i:0,j:12, type: "CrashableWall"}],
            [{i:1,j:0, type: "clear"},{i:1,j:1, type: "Wall"},{i:1,j:2, type: "CrashableWall"},{i:1,j:3, type: "Wall"},{i:1,j:4, type: "clear"},{i:1,j:5, type: "Wall"},{i:1,j:6, type: "clear"},{i:1,j:7, type: "Wall"},{i:1,j:8, type: "clear"},{i:1,j:9, type: "Wall"},{i:1,j:10, type: "clear"},{i:1,j:11, type: "Wall"},{i:1,j:12, type: "CrashableWall"}],
            [{i:2,j:0, type: "clear"},{i:2,j:1, type: "clear"},{i:2,j:2, type: "clear"},{i:2,j:3, type: "clear"},{i:2,j:4, type: "clear"},{i:2,j:5, type: "clear"},{i:2,j:6, type: "clear"},{i:2,j:7, type: "clear"},{i:2,j:8, type: "clear"},{i:2,j:9, type: "clear"},{i:2,j:10, type: "clear"},{i:2,j:11, type: "clear"},{i:2,j:12, type: "clear"}],
            [{i:3,j:0, type: "CrashableWall"},{i:3,j:1, type: "Wall"},{i:3,j:2, type: "clear"},{i:3,j:3, type: "Wall"},{i:3,j:4, type: "CrashableWall"},{i:3,j:5, type: "Wall"},{i:3,j:6, type: "clear"},{i:3,j:7, type: "Wall"},{i:3,j:8, type: "CrashableWall"},{i:3,j:9, type: "Wall"},{i:3,j:10, type: "clear"},{i:3,j:11, type: "Wall"},{i:3,j:12, type: "clear"}],
            [{i:4,j:0, type: "clear"},{i:4,j:1, type: "clear"},{i:4,j:2, type: "clear"},{i:4,j:3, type: "clear"},{i:4,j:4, type: "clear"},{i:4,j:5, type: "clear"},{i:4,j:6, type: "clear"},{i:4,j:7, type: "CrashableWall"},{i:4,j:8, type: "CrashableWall"},{i:4,j:9, type: "CrashableWall"},{i:4,j:10, type: "clear"},{i:4,j:11, type: "CrashableWall"},{i:4,j:12, type: "clear"}],
            [{i:5,j:0, type: "CrashableWall"},{i:5,j:1, type: "Wall"},{i:5,j:2, type: "clear"},{i:5,j:3, type: "Wall"},{i:5,j:4, type: "clear"},{i:5,j:5, type: "Wall"},{i:5,j:6, type: "clear"},{i:5,j:7, type: "Wall"},{i:5,j:8, type: "CrashableWall"},{i:5,j:9, type: "Wall"},{i:5,j:10, type: "clear"},{i:5,j:11, type: "Wall"},{i:5,j:12, type: "clear"}],
            [{i:6,j:0, type: "clear"},{i:6,j:1, type: "clear"},{i:6,j:2, type: "clear"},{i:6,j:3, type: "clear"},{i:6,j:4, type: "clear"},{i:6,j:5, type: "CrashableWall"},{i:6,j:6, type: "CrashableWall"},{i:6,j:7, type: "clear"},{i:6,j:8, type: "clear"},{i:6,j:9, type: "clear"},{i:6,j:10, type: "clear"},{i:6,j:11, type: "CrashableWall"},{i:6,j:12, type: "clear"}],
            [{i:7,j:0, type: "clear"},{i:7,j:1, type: "Wall"},{i:7,j:2, type: "Wall"},{i:7,j:3, type: "Wall"},{i:7,j:4, type: "clear"},{i:7,j:5, type: "Wall"},{i:7,j:6, type: "clear"},{i:7,j:7, type: "Wall"},{i:7,j:8, type: "clear"},{i:7,j:9, type: "Wall"},{i:7,j:10, type: "CrashableWall"},{i:7,j:11, type: "Wall"},{i:7,j:12, type: "clear"}],
            [{i:8,j:0, type: "clear"},{i:8,j:1, type: "clear"},{i:8,j:2, type: "clear"},{i:8,j:3, type: "CrashableWall"},{i:8,j:4, type: "clear"},{i:8,j:5, type: "clear"},{i:8,j:6, type: "CrashableWall"},{i:8,j:7, type: "clear"},{i:8,j:8, type: "clear"},{i:8,j:9, type: "clear"},{i:8,j:10, type: "CrashableWall"},{i:8,j:11, type: "clear"},{i:8,j:12, type: "clear"}],
        ]

        //this.walls = [ {i:412, j : 1231}, ...]
        //this.CrashableWall = [ {i: 213, j: 313},...]
        //
        let square = [];
        let wall = [];
        let crashableWall = [];
        debugger;
        for(let row of create_map){
            for (let coll of row){
                if(coll.type === "Player"){
                    square = this.getSquare(coll.j,coll.i);
                    //console.log(coll)
                    this.Players_observ.push(new Player(coll.i, square.start_x,square.start_y,100,"#b00b0b"));
                }
                else if(coll.type === "Wall"){
                    square = this.getSquare(coll.j,coll.i);
                    wall = new Wall(square.start_x,square.start_y,100,100,4,color_wall);
                    //console.log(coll)
                    this.Square_Game.setWall(wall);
                    this.Walls.push(wall);
                }
                else if(coll.type === "CrashableWall"){
                    square = this.getSquare(coll.j,coll.i);
                    //console.log(coll)
                    crashableWall = new CrashableWall(square.start_x,square.start_y,100,100,4,color_crashable)
                    this.CrashableWalls.push(crashableWall);
                }
            }
        }

        this.Square_Game.setCrashableWalls(this.CrashableWalls);
    }

    get_size_square(obj) {
        //Добавить соотношение

        this.size_height = obj.canvas_me.height;
        this.size_width = obj.canvas_me.width;
        console.log(this.size_height);
        console.log(this.size_width);
    }

    check_place(x, y) {
        for (let i = 0; i < this.Players_observ.length; i++) {
            if (this.Players_observ[i][0] === x && this.Players_observ[i][1] === y) {
                console.log("bad")
                return true
            }
        }
        return false
    }

    check_collision_square(x = 0, y = 0, type) {
        if (type === "plus") {
            if (x + (100) > this.size_width + 1)
                return true;
            else if (y + (100) > this.size_height + 1)
                return true;
        } else {
            if (x < -1)
                return true;
            else if (y < -1)
                return true;
        }
        return false;
    }

    create_coordinate() {
        let [y, x] = [getRandom(this.size_height), getRandom(this.size_width)]
        while (this.check_place(x, y) || this.check_collision_square(x, y, "plus")) {
            [y, x] = [getRandom(this.size_height), getRandom(this.size_width)]
        }
        return [x, y];
    }

    start_games() {
        let canvas = new cenvas(this.square_game);
        this.get_size_square(canvas);
        //this.wall_init();
        //this.player_init(1);
        this.init();

        this.Square_Game.setPlayer(this.Players_observ);
        this.Square_Game.draw(canvas.ctx);
        this.playing_match = true;
        //canvas.draw_plant(this.squares);
        //canvas.draw_player(this.Players_observ);
        //canvas.draw_bombs(this.live_bomb);

        this.Game_Loop(canvas);

    }

    Game_Loop(obj) {

        if (!this.playing_match)
            return;
        this.Square_Game.rerender(obj.ctx);
        this.Update_Bombs();
        this.Update_Players();

        this.Square_Game.setPlayer(this.Players_observ);
        this.Square_Game.draw(obj.ctx);
        this.Update_Explose();


        setTimeout(this.Game_Loop.bind(this, obj), milisec);
    }
    update_size_explose(polygon,explose,result){
        if(polygon[1] === "right") {
            explose.size_explosion_right = Math.abs(result[1].start_x - polygon[0].start_x);
            polygon[0] = new Polygons(explose.start_x, explose.start_y, explose.size_explosion_right, 100,4,explose.color )
        }
        else if(polygon[1] === "left"){
            debugger;
            console.log(explose)
            console.log(result);
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

    getCrashalbeWall(result){
        for(let i = 0; i < this.CrashableWalls.length; i++){
            if(result.center_x === this.CrashableWalls[i].center_x && result.center_y === this.CrashableWalls[i].center_y)
                return i;
        }
        return -1;
    }

    check_Explose_Collision(explose){

        let object_to_check = [].concat(this.Walls);

        for(let i of this.Players_observ){
            object_to_check.push(i)
        }
        for(let i of this.live_bomb){
            object_to_check.push(i)
        }
        for(let i of this.CrashableWalls){
            object_to_check.push(i);
        }
        console.log(explose.Polygon_collection)
        for(let polygon of explose.Polygon_collection) {
            //console.log(object_to_check);
            let check_to_collision = this.Create_Check_To_Collision(polygon[0], object_to_check, 1000);
            let result = this.check_collision(polygon[0], check_to_collision);
            for(let res of result) {
                if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof Player) {

                    let player = this.getPlayerFromId(res[1].id)
                    if (player.id !== -1)
                        this.Players_observ.splice(player.id, 1);
                    break;

                } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof Wall) {
                    this.update_size_explose(polygon, explose, res)
                    break;

                } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof CrashableWall) {
                    this.update_size_explose(polygon, explose, res)
                    let index = this.getCrashalbeWall(res[1]);
                    this.CrashableWalls.splice(index, 1);
                    break;
                } else if (res[0] !== true && res[0].overlap !== 0 && res[1] instanceof Bombs) {
                    this.update_size_explose(polygon, explose, res)
                    break;
                }
            }
        }
    }

    Update_Explose() {
        if (this.live_explosion.length < 1)
            return;
        if (this.live_explosion[0].time_left_live <= 0) {
            this.live_explosion.shift();
            //this.live_explosion.push(new Explosion(temp.id,temp.x,temp.y, temp.live_explosion,temp.size_explosion));
        }

        for (let i = 0; i < this.live_explosion.length; i++) {
            this.live_explosion[i].time_left_live -= milisec / 1000;
            this.check_Explose_Collision(this.live_explosion[i]);
            if (this.live_explosion[i].time_left_live <= this.live_explosion[i].time_live / 2) {

                this.live_explosion[i].current_animation_size -= 0.125 / (this.live_explosion[i].time_live / 0.5);
                this.live_explosion[i].update_Polygons_animations();

            } else {
                this.live_explosion[i].current_animation_size += 0.125 / (this.live_explosion[i].time_live / 0.5);
                this.live_explosion[i].update_Polygons_animations();
            }
        }
    }

    getPlayerFromId(id){
        for(let i of this.Players_observ){
            if(i.id === id)
                return i;
        }
        return -1;
    }

    Update_Bombs() {
        if (this.live_bomb.length < 1)
            return;
        if (this.live_bomb[0].time_left_live <= 0) {
            const temp = this.live_bomb.shift();
            temp.cell_coord.type = "clear";
           // console.log(temp.Player_Parent.Player_Bombs.shift());
            //console.log(temp);

            let explose = new Explosion(temp.id, temp.start_x, temp.start_y, temp.live_explosion, temp.size_explosion)
            this.check_Explose_Collision(explose);

            //this.live_explosion.push(new Explosion(temp.id, temp.x + (this.size_width / 40) + (this.size_height / 105), temp.y + (this.size_height/20) + (this.size_height / 105), temp.live_explosion, temp.size_explosion));
            this.live_explosion.push(explose);
            this.Square_Game.setExplosion(this.live_explosion);
        }
        for (let i = 0; i < this.live_bomb.length; i++) {

            this.live_bomb[i].time_left_live -= milisec / 1000;
            //let time_left = bomb.time_live;
            if (this.live_bomb[i].time_left_live <= 1) {
                this.live_bomb[i].size_for_animation += milisec / 1600;
                this.live_bomb[i].speed_flashing += 1;
                this.live_bomb[i].color = rgb(180 + (3 * this.live_bomb[i].speed_flashing), 142, 0)
                this.live_bomb[i].update_animation(this.live_bomb[i].size_for_animation,this.live_bomb[i].color)

            }
        }

    }


    Update_Players() {

        for (const player of this.Players_observ) {
            let flags = player.update();
            //debugger;
            if (!flags.do_it)
                return;
            if (flags.Escape) {
                this.playing_match = false;
                return;
            }
            this.Choose_Move_Player(player, flags);
            this.Choose_Plant_Bomb(player, flags);
            this.Update_Status_Player(player);

        }
    }

    Update_Status_Player(player) {
        if (player.planting) {
            //debugger;

            if (player.player_bomb_cooldown - player.player_bomb_cooldown_left <= 0) {
                console.log("Sec");
                player.player_bomb_cooldown_left = 0;
                player.planting = false;
            }
            player.player_bomb_cooldown_left += milisec / 1000;

        }
        //player.player_bomb_cooldown_left += milisec/100;
    }
    Create_Check_To_Collision(Main_obj, collection_Obj,ogr){
        let elem = 0;
        let min_distance = -1;
        let this_distance = 0;

        let Object_for_Check_Collision = [];

        for(let el of collection_Obj){
            if(Main_obj === el)
                continue;
            this_distance = Math.sqrt(Math.pow(Main_obj.center_x - el.center_x,2) + Math.pow(Main_obj.center_y - el.center_y,2))
            if(this_distance <= ogr)
                Object_for_Check_Collision.push(el);
        }


        Object_for_Check_Collision.sort( function (a,b){
            let distanceA = Math.sqrt(Math.pow(Main_obj.center_x - a.center_x, 2) + Math.pow(Main_obj.center_y - a.center_y, 2));
            let distanceB = Math.sqrt(Math.pow(Main_obj.center_x - b.center_x, 2) + Math.pow(Main_obj.center_y - b.center_y, 2));

             if (distanceA < distanceB) {
                return -1;
            } else if (distanceA > distanceB) {
                return 1;
            } else {
                return 0;
            }
        })

        return Object_for_Check_Collision;
    }

    delete_bomb(el_inParent,el){

        for(let i = 0; i < el_inParent.length; i++){
            if(el === el_inParent[i]) {
                el_inParent.splice(i, 1)
                return true;
            }
        }
        return false;
    }

    check_collision(Main_Obj, Collection_Obj){
        let out_put = []
        for(let el of Collection_Obj){
            let MTV = [];
            if(el instanceof Polygons) {
                MTV = GetCollision(Main_Obj,el);
            }
            else {
                MTV = GetCollision(Main_Obj, el.Polygons);
            }
            if(MTV.overlap === 0 && el instanceof Bombs) {
                if(el.Player_Parent !== undefined &&this.delete_bomb(el.Player_Parent.InPlantBombs,el))
                    el.Player_Parent = undefined;
                continue;
            }

            if(MTV !== false && MTV.overlap >0) {
                out_put.push([MTV,el]);
            }
        }
        if(out_put.length === 0)
            return [];
        else
            return out_put;
    }

    delete_choose_element(el,arr){
        for(let i = 0; i < arr.length;i++){
            if(el === arr[i])
                return i;
        }
        return -1;
    }
    Choose_Move_Player(player, flags) {
        let temp_player = new Player(player.id + 1,player.start_x,player.start_y,player.bombs, player.color);

        let Object_to_check = [].concat(this.Walls);
        for(let i of this.live_bomb) {
            Object_to_check.push(i);
        }
        for(let i of this.CrashableWalls){
            Object_to_check.push(i);
        }

        if (flags.KeyW) {
            if (!this.check_collision_square(player.start_x, player.start_y - 10, "minus")) {
                temp_player.Player_Update_coord(player.start_x,player.start_y - 10);
                let check_to_collision = this.Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
                let result = this.check_collision(temp_player.Polygons, check_to_collision);
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
            if (!this.check_collision_square(player.start_x, player.start_y + 10, "plus")) {
                temp_player.Player_Update_coord(player.start_x,player.start_y + 10);

                let check_to_collision = this.Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
                let result = this.check_collision(temp_player.Polygons, check_to_collision);
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
            if (!this.check_collision_square(player.start_x - 10, player.start_y, "minus")) {
                temp_player.Player_Update_coord(player.start_x - 10,player.start_y);
                let check_to_collision = this.Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
                let result = this.check_collision(temp_player.Polygons, check_to_collision);
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
            if (!this.check_collision_square(player.start_x + 10, player.start_y, "plus")) {
                temp_player.Player_Update_coord(player.start_x + 10,player.start_y);
                let check_to_collision = this.Create_Check_To_Collision(temp_player.Polygons,Object_to_check, 150);
                let result = this.check_collision(temp_player.Polygons, check_to_collision);
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

    Choose_Plant_Bomb(player, flags) {
        if (!flags.Space || player.player_bomb <= 0 || player.planting)
            return;

        player.player_bomb -= 1;
        player.planting = true;
        let new_bomb = new Bombs(this.live_bomb.length, player.start_x, player.start_y)
        let result = this.check_collision(player.Polygons, [new_bomb]);

        if(result[0][0].overlap > 0) {

            player.InPlantBombs.push(new_bomb);

        }
        new_bomb.Player_Parent = player;
        this.Choose_Square_To_Plant(new_bomb)
        this.live_bomb.push(new_bomb)
        this.Square_Game.setBombs(this.live_bomb);
    }
    Choose_Square_To_Plant(bomb){

        let elem = 0;
        let min_distance = -1;
        let this_distance = 0;
        for (let i of this.Square_Game.squares_cell){
            for(let j of i){
                if(j.type !== "clear") //Если будет два игрока, надо сделать, что одного игрока не спавнилась на другом
                    continue;
                this_distance = Math.sqrt(Math.abs(j.start_x - bomb.start_x) + Math.abs(j.start_y - bomb.start_y))
                if(min_distance === -1){
                    min_distance = this_distance;
                    elem = j;
                }
                else if(this_distance < min_distance){
                    min_distance = this_distance;
                    elem = j;
                }
            }
        }

        if(min_distance > 150)
            return;
        bomb.update_coord(elem.start_x,elem.start_y)
        elem.type = "bomb";
        bomb.cell_coord = elem;
    }

}


class cenvas {

    constructor(obj) {

        this.canvas_me = document.createElement("canvas")
        this.canvas_me.className = "MainGame"
        this.ctx = this.canvas_me.getContext('2d')
        obj.appendChild(this.canvas_me);

        this.canvas_me.height = 900;
        this.canvas_me.width = 1300;

    }
}


export default Meine_Spiele;