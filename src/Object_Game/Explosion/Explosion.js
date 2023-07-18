
import Update from "/src/Update_extends/Update"
import Polygon from "../../Shape/Polygons";

class Explosion extends Update {
    constructor(id, x, y, live_explosion, size_explosion) {
        super();
        this.id = id;
        this.time_live = live_explosion;
        this.time_left_live = live_explosion;
        this.size_explosion = size_explosion;
        this.color = "#ff8e00";
        this.explosion_animation_size = 0;
        this.current_animation_size = this.explosion_animation_size;
        this.start_x = x;
        this.start_y = y;

        this.size_explosion_right = this.size_explosion*100 + 100
        this.size_explosion_left = this.size_explosion*(-100)
        this.size_explosion_up = this.size_explosion*(-100);
        this.size_explosion_down = this.size_explosion*100 + 100;

        this.Polygon_collection = []
        this.Polygon_collection.push([new Polygon(this.start_x,this.start_y,this.size_explosion_right, 100, 4, this.color),"right"]);
        this.Polygon_collection.push([new Polygon(this.start_x,this.start_y,this.size_explosion_left, 100, 4, this.color),"left"]);
        this.Polygon_collection.push([new Polygon(this.start_x,this.start_y, 100, this.size_explosion_up , 4, this.color),"up"]);
        this.Polygon_collection.push([new Polygon(this.start_x,this.start_y, 100,   this.size_explosion_down, 4, this.color),"down"]);

        // this.Polygons_right = new Polygon(this.start_x,this.start_y,this.size_explosion*100 + 100, 100, 4, this.color)
        // this.Polygons_left = new Polygon(this.start_x,this.start_y,this.size_explosion*(-100), 100, 4, this.color);
        // this.Polygons_up = new Polygon(this.start_x,this.start_y, 100, this.size_explosion*(-100) , 4, this.color);
        // this.Polygons_down = new Polygon(this.start_x,this.start_y, 100, this.size_explosion*100 + 100, 4, this.color);

        this.Polygons_right_animation = [];
        this.Polygons_left_animation = [];
        this.Polygons_up_animation = [];
        this.Polygons_down_animation = [];
        this.init();
    }
    update_Polygons_animations(){
        debugger;
        this.Polygons_right_animation.splice(0,2)
        this.Polygons_left_animation.splice(0,2)
        this.Polygons_up_animation.splice(0,2)
        this.Polygons_down_animation.splice(0,2)
        this.init();
    }
    init(){
        this.Polygons_right_animation.push(new Polygon(this.start_x,this.start_y+ 50,   this.size_explosion_right, 50 * this.current_animation_size, 4, this.color))
        this.Polygons_right_animation.push(new Polygon(this.start_x,this.start_y+ 50,   this.size_explosion_right, -50 * this.current_animation_size, 4, this.color))

        this.Polygons_left_animation.push(new Polygon(this.start_x,this.start_y+ 50,  this.size_explosion_left, 50 * this.current_animation_size, 4, this.color))
        this.Polygons_left_animation.push(new Polygon(this.start_x,this.start_y+ 50,  this.size_explosion_left, -50 * this.current_animation_size, 4, this.color))

        this.Polygons_up_animation.push(new Polygon(this.start_x+ 50,this.start_y,50 * this.current_animation_size,  this.size_explosion_down  , 4, this.color))
        this.Polygons_up_animation.push(new Polygon(this.start_x+ 50,this.start_y,-50 * this.current_animation_size,  this.size_explosion_down , 4, this.color))

        this.Polygons_down_animation.push(new Polygon(this.start_x+ 50,this.start_y,50 * this.current_animation_size, this.size_explosion_up , 4, this.color))
        this.Polygons_down_animation.push(new Polygon(this.start_x+ 50,this.start_y,-50 * this.current_animation_size, this.size_explosion_up , 4, this.color))

    }

    update() {

    }
}

export default Explosion;