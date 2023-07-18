import {getRandom} from "./getRandom";

export default class cenvas {

    constructor() {
        // this.canves = canves;
        // this.ctx = canves.getContext('2d')
        this.players = []
        this.canvas_me = document.createElement("canvas")
        this.ctx = this.canvas_me.getContext('2d')
        document.body.appendChild(this.canvas_me)

        this.canvas_me.className = "gafield"
        this.canvas_me.height = 600;
        this.canvas_me.width = 800;
    }

    check_place(x,y){
        for (let i = 0; i < this.players.length; i++){
            if (this.players[i][0] === x && this.players[i][1] === y){
                console.log("bad")
                return true
            }
        }
        return false
    }

    new_player(){
        let [y,x] = [getRandom(6), getRandom(8)]

        while (this.check_place(x,y)){
            [y,x] = [getRandom(6), getRandom(8)]
        }
        this.players.push([x,y])

    }
    draw_init(){
        this.new_player()
        this.new_player()
        console.log(this.players)
        // let react_one = ctx.fillRect((x * 100) + 25, (y * 100) + 25, 50,50);
        this.players.forEach((el) => {
            this.ctx.fillRect((el[0] * 100) + 25, (el[1] * 100) + 25, 50,50);
        })
    }


    draw(prev,next){
        return "string"
    }

    clear_canvas() {

    }

}