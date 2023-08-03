
// import canvas_me from "/src/Size_canvas"
// import Cell from "/src/Object_Game/Cell/Cell"

const canvas_me = require("../../Size_canvas");
const Cell = require("../Cell/Cell")

const CELL_HEIGHT = 100;
const CELL_WIDTH = 100;

class Square_Game{
    constructor() {
        this.height = CELL_HEIGHT;
        this.width = CELL_WIDTH;
        this.squares_cell = this.init_square()
        this.object_wall = [];
        this.object_player = [];
        this.object_crashable_walls = [];
        this.bombs = [];
        this.explosion = [];
    }

    init_square(){
        let squares = [];
        let count_of_width = canvas_me.width / this.width;
        let count_of_height = canvas_me.height / this.height;
        let x = 0;
        for(let i = 0; i < count_of_width; i++){
            let y = 0;
            let prom_square = [];
            for(let j = 0; j < count_of_height; j++){
                let cell = new Cell(x,y,this.width,this.height,4,"#0da497");
                y += this.height;
                prom_square.push(cell);
            }
            squares.push(prom_square);
            x += this.width;
        }
        return squares;
    }
    setWall(Wall){
        this.object_wall = Wall;
    }
    getWall(){}

    setBombs(Bombs){
        this.bombs = Bombs;
    }
    getBombs(){}

    setPlayer(Player){
        this.object_player = Player;
    }
    getPlayer(){}

    setExplosion(explosions){
        this.explosion = explosions;
    }
    getExplosion(){}

    setCrashableWalls(Crashable_Walls){
        this.object_crashable_walls = Crashable_Walls;
    }
    getCrashableWalls(){

    }

    draw(ctx){
        for(let el of this.squares_cell){
            for(let square of el){
                square.draw_polyg(ctx,true);
            }
        }

        for(let player of this.object_player){
            player.Polygons.draw_polyg(ctx,true);
        }
        for(let wall of this.object_wall){
            wall.Polygons.draw_polyg(ctx,true);
        }
        for(let crash of this.object_crashable_walls){
            crash.Polygons.draw_polyg(ctx,true);
        }

        for(let bomb of this.bombs){
            //debugger;
            //bomb.Polygons.draw_polyg(ctx);
            bomb.Circle_for_Draw.draw(ctx);
        }
        for(let explose of this.explosion){

            for(let line of explose.Polygons_right_animation){
                line.draw_polyg(ctx,true);
            }
            for(let line of explose.Polygons_left_animation){
                line.draw_polyg(ctx,true);
            }
            for(let line of explose.Polygons_up_animation){
                line.draw_polyg(ctx,true);
            }
            for(let line of explose.Polygons_down_animation){
                line.draw_polyg(ctx,true);
            }
            debugger;
            // explose.Polygon_collection[0][0].draw_polyg(ctx);
            // explose.Polygon_collection[1][0].draw_polyg(ctx);
            // explose.Polygon_collection[2][0].draw_polyg(ctx);
            // explose.Polygon_collection[3][0].draw_polyg(ctx);
            //explose
        }
    }
    rerender(ctx){
        ctx.clearRect(0, 0, canvas_me.width, canvas_me.height);
    }
}


module.exports = Square_Game;