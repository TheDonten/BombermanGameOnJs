// import Update from "/src/Update_extends/Update"
// import Polygons from "../../Shape/Polygons";
// import Circle from "../../Shape/Circle";

const Update = require("../../Update_extends/Update")
const Polygons = require("../../Shape/Polygons");
const Circle = require("../../Shape/Circle");

class Bombs extends Update {
    constructor(id, x, y, color) {
        super();
        this.Player_Parent = {}
        this.id = id;
        this.start_x = x;
        this.start_y = y;
        this.center_x = this.start_x + 30;
        this.center_y = this.start_y + 30;
        this.time_live = 1;
        this.live_explosion = 1;
        this.size_explosion = 1;
        this.size_for_animation = 1;
        this.color = "#070606";
        this.reverse = false;
        this.speed_flashing = 1.1;
        this.flashing = 0;
        this.time_left_live = this.time_live;
        this.size = 3;
        this.Polygons = new Polygons(this.start_x,this.start_y,100,100,4, this.color);
        this.Circle_for_Draw = new Circle(this.start_x,this.start_y,20,this.color);
        this.cell_coord = {};
    }
    update_coord(x,y){

        this.start_x = x;
        this.start_y = y;
        this.center_x = this.start_x + 20;
        this.center_y = this.start_y + 20;
        this.Polygons = new Polygons(this.start_x,this.start_y ,100,100,4, this.color);
        this.Circle_for_Draw = new Circle(this.start_x,this.start_y,20,this.color);
    }
    update_animation(size_for_animation,color){
        this.center_x = this.start_x + 50;
        this.center_y = this.start_y + 50;
        //this.Polygons = new Polygons(this.center_x - (20 * size_for_animation),this.center_y  - (20 * size_for_animation),40 * size_for_animation,40 * size_for_animation,4, color);

        this.Circle_for_Draw = new Circle(this.start_x,this.start_y,20 * size_for_animation, color);
    }
    update() {
        if (this.time_live === 0) {
            //delete object
        }
    }
}

module.exports = Bombs;