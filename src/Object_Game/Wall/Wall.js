
const Polygons = require("../../Shape/Polygons")

class Wall {
    constructor(id,x,y,color) {
        this.start_x = x;
        this.start_y = y;
        this.weight = 100;
        this.height = 100;
        this.center_x = Math.floor(this.start_x + this.weight/2)
        this.center_y = Math.floor(this.start_y + this.height/2)
        this.color = color;

        this.Polygons = new Polygons(x,y,this.weight,this.height,4,color)
        this.type = "Wall";
        this.cell_coord = {};
    }
}

module.exports = Wall;