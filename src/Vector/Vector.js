class Vector{
    constructor(x,y) {
        this.points = [x,y];
    }

    normalize(){
        let length = Math.sqrt(Math.pow(this.points[0],2) + Math.pow(this.points[1], 2));
        this.points[0] /= length;
        this.points[1] /= length;
    }
    dot(ohter_vector){
        if(this.points.length !== ohter_vector.points.length)
            return undefined;
        let p = 0;
        for(let i = 0; i < this.points.length; i++){
            p += this.points[i] * ohter_vector.points[i];
        }
        return p;
    }
    dot_abs(ohter_vector){
        if(this.points.length !== ohter_vector.points.length)
            return undefined;
        let p = 0;
        for(let i = 0; i < this.points.length; i++){
            p += this.points[i] * ohter_vector.points[i];
        }
        return Math.abs(p);
    }
}
export default Vector;