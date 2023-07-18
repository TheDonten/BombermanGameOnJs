
import  Meine_Spiele from "./MeineGame";
import Polygon from "./Shape/Polygons";
import GetCollision from "./Colisision/GetCollision";
import Square_Game from "./Object_Game/Square_Game/Square_Game"
import Player from "./Object_Game/Players/Player";
import canvas_me_si from "./Size_canvas";




export default class Init_game {

    constructor() {
        this.container = document.createElement("div");

        this.container.className = "container";
        this.container.id = "container_game";
        document.body.appendChild(this.container);

        this.title = document.createElement("h1");

        this.title.className = "title"
        this.title.appendChild(document.createTextNode("My Bomberman"));
        this.container.appendChild(this.title);

        this.button_start = document.createElement("button");
        this.button_start.className = "start_game";
        this.button_start.id = "button_start";
        this.button_start.onclick = this.game_start.bind(this);
        this.button_start.appendChild(document.createTextNode("Click me to start"));
        this.container.appendChild(this.button_start);


    }

    game_start(obj){
        this.button_start.remove();
        this.title.remove();
        let square_game = document.getElementById("container_game");
        square_game.remove();
        let clients = {}
        debugger;



        //console.log(socket.readyState())

        //socket.send("Привет");

        let game = new Meine_Spiele();
        game.start_games();
    }
}

