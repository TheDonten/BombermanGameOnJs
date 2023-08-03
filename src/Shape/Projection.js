class Projection{
    constructor(min,max) {
        this.min = min;
        this.max = max;
    }
    overlap(other_projection){
        return !(this.min > other_projection.max || other_projection.min > this.max);
    }

    getOverlap(other_projection){
        if(this.overlap(other_projection)){
            return Math.min(this.max, other_projection.max) - Math.max(this.min,other_projection.min);
        }
    }
}

module.exports = Projection;