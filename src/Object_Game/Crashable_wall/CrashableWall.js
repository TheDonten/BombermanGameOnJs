import Polygons from "../../Shape/Polygons";

class CrashableWall{
    constructor(x,y,width,height,count_sides,color) {
        this.start_x = x;
        this.start_y = y;


        this.width = width;
        this.height = height;

        this.center_x = Math.floor(this.start_x + this.width/2)
        this.center_y = Math.floor(this.start_y + this.height/2)

        this.count_sides = count_sides;
        this.color = color
        this.type = "CrashableWall";
        this.Polygons = new Polygons(x,y,width,height,count_sides,color)
    }

}

export default CrashableWall;
