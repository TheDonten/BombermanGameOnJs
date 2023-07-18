

class Circle{
    constructor(x,y,radius = 20, color) {
        this.start_x = x;
        this.start_y = y;
        this.center_x = this.start_x + 50;
        this.center_y = this.start_y + 50;
        this.radius = radius;
        this.color = color
    }

    draw(ctx){

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.center_x, this.center_y,
            this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

export default Circle;