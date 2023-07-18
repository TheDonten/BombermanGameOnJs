import Polygon from "../../Shape/Polygons";

class Wall extends Polygon{
    constructor(x,y,weight,height,count_sides,color) {
        super(x,y,weight,height,count_sides,color);
        this.type = "Wall";
    }
}

export default  Wall;