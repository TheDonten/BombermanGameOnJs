// import Polygon from "../../Shape/Polygons";

const Polygon = require("../../Shape/Polygons")

class Cell extends Polygon{
    constructor(x,y,width,height,count_sides,color) {
        super(x,y,width,height,count_sides,color);
        this.type = "clear";
        this.Type_Stand = "None";
    }

}


module.exports = Cell;