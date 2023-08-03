const Polygons = require("../../Shape/Polygons")

class CrashableWall{
    constructor(id, x,y,color) {
        this.start_x = x;
        this.start_y = y;


        this.width = 100;
        this.height = 100;

        this.center_x = Math.floor(this.start_x + this.width/2)
        this.center_y = Math.floor(this.start_y + this.height/2)

        this.count_sides = 4;
        this.color = color
        this.type = "CrashableWall";
        this.Polygons = new Polygons(x,y,this.width,this.height,this.count_sides,color)
        this.cell_coord = {};
    }

}


module.exports = CrashableWall;