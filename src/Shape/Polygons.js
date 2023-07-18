
import Vector from "/src/Vector/Vector"
import Projection from "./Projection"

class Polygon{
    constructor(x,y,width,height, count_sides = 4,color) {
        this.start_x = x;
        this.start_y = y;
        this.width = width;
        this.height = height;
        this.count_sides = count_sides;
        this.points = []
        this.color = color;
        this.center_x = Math.floor(this.start_x + 100/2)
        this.center_y = Math.floor(this.start_y + 100/2)
        this.vertics = this.create_vertices()
    }
    update_coord(x,y){
        this.start_x = x;
        this.start_y = y;
        this.center_x = Math.floor(this.start_x + this.width/2);
        this.center_y = Math.floor(this.start_y + this.height/2)
        this.vertics = this.create_vertices();
    }
    draw_polyg(ctx,storke_or_fill = false){
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.color;
        if(!storke_or_fill)
            ctx.strokeRect(this.start_x,this.start_y, this.width,this.height);
        else{
            ctx.fillRect(this.start_x,this.start_y, this.width,this.height);
        }
    }




    create_vertices(){
        let vertics = [];
        vertics.push(new Vector(this.start_x,this.start_y));
        vertics.push(new Vector(this.start_x + this.width, this.start_y));
        vertics.push(new Vector(this.start_x + this.width,this.start_y + this.height));
        vertics.push(new Vector(this.start_x, this.start_y + this.height))
        return vertics;
    }
    getNormal(p1,p2){
        let normal = new Vector(p2.points[1] - p1.points[1], (-1)*(p2.points[0] - p1.points[0]))
        normal.normalize();
        return normal;
    }

    projection(axis){
        let min = axis.dot(this.vertics[0]);
        let max = min;
        for(let i = 1; i < this.vertics.length; i++){
            //let p = axis.dot(this.vertics[i]);
            let p = axis.dot(this.vertics[i]);
            if(p < min){
                min = p;
            }
            else if(p > max){
                max = p;
            }
        }
        let proj = new Projection(min,max);
        return proj;
    }

    getAxes(){
        let axis = [];
        for(let i = 0; i < this.vertics.length; i++){
            let p1 = this.vertics[i];
            let p2 = this.vertics[i + 1 === this.vertics.length ? 0 : i + 1];
            let edges = this.getNormal(p1,p2);
            axis.push(edges);
        }
        return axis;
    }
}

export default Polygon;