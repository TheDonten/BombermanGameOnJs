

// export default function handle (e){
//     let prom = e.code
//     switch (prom) {
//         case "KeyW": alert("You Push W!");
//         return
//         break;
//         case "KeyS": alert("You Push S!"); break;
//         case "KeyD": alert("You Push D!"); break;
//         case "KeyA": alert("You Push A!"); break;
//     }
// }

export default class Input {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    _up(){
        return this.y = this.y + 1
    }
    _down() {
        return this.y = this.y - 1
    }
    _left(){
        return this.x = this.x + 1
    }

    _right(){
        return this.x = this.x - 1
    }

    handle(e) {
        let prom = e.code
        switch (prom) {
            case "KeyW":

                alert("You Push W!");
                return this._up()
                break;
            case "KeyS":
                console.log(this.y)
                alert("You Push S!");
                return this._down()
                break;
            case "KeyD":
                console.log(this.x)
                alert("You Push D!");
                return this._right()
                break;
            case "KeyA":
                console.log(this.x)
                alert("You Push A!");
                return this._left()
                break;
//     }
        }
    }
}