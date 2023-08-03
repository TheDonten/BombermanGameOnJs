
// import  Meine_Spiele from "./MeineGame";
// import Polygon from "../../Game_with_socket_WebPack/src/Object_Game/Shape/Polygons";
// import GetCollision from "./Colisision/GetCollision";
// import Square_Game from "./Object_Game/Square_Game/Square_Game"
// import Player from "./Object_Game/Players/Player";
// import canvas_me_si from "./Size_canvas";

const ClientGame = require("../Client_Game/ClientGame")
const Player = require("../src/Object_Game/Players/Player")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const { io } = require("socket.io-client");
//let count_connection = require('./state_server.js')



export default class Init_game {

    constructor() {

        this.socket = io();
        this.wait_game(0);
        this.socket.on( "Update_await_player+", (args) =>{
            this.button_start.textContent = "Click me to start" + "("+ args + "/2) Player";
        })
        this.socket.on( "Update_await_player-", (args) =>{
            this.button_start.textContent = "Click me to start" + "("+ args + "/2) Player";
        })
        this.socket.on( "Start", (args) =>{
            this.button_start.textContent = "PLAY";
            this.button_start.onclick = this.game_start.bind(this);
        })

        this.socket.on('hey', (args) =>{
           // console.log(args);
        });

        this.socket.on("Init", (args) =>{
            this.wait_answer = false;

            let new_player = new Player(args.Player.id, args.Player.start_x, args.Player.start_y,args.Player.color)
            this.ClientGame = new  ClientGame(new_player, this.socket)
            new_player.setObserver(this.ClientGame);
            //console.log(new_player);
            let props = {
                id : 0,
                start_x : 0,
                start_y : 0,
                color : 0
            }
            props.id = args.Player.id
            props.start_x = args.Player.start_x
            props.start_y = args.Player.start_y
            props.color = args.Player.color
            this.init_server(props);

        });

        this.socket.on("GameOver", (args) =>{
            //Удалить игру и создать новый экран ожидания
            console.log("GameOver");
            this.ClientGame.stop();
            this.ClientGame = undefined;

            this.clear_body();
            this.wait_game_socket();
        })
    }

    init_server(props){
     this.socket.emit("InitDataServer", props);
    }

    clear_body(){
        while(document.body.firstChild){
            document.body.removeChild(document.body.firstChild);
        }
    }

    wait_game(resp){
        this.container = document.createElement("div");
        this.container.className = "container";
        this.container.id = "container_game";
        this.ClientGame = {};
        document.body.appendChild(this.container);

        this.title = document.createElement("h1");

        this.title.className = "title"
        this.title.appendChild(document.createTextNode("My Bomberman"));
        this.container.appendChild(this.title);

        this.button_start = document.createElement("button");
        this.button_start.className = "start_game";
        this.button_start.id = "button_start";
        let text = "Click me to start" + "("+ resp + "/2) Player";
        this.button_start.appendChild(document.createTextNode(text));
        this.container.appendChild(this.button_start);
    }

    wait_game_socket(){
        this.socket.emit("NewWaitRoom", true, (resp)=>{
            console.log("emit take")
            this.wait_game(resp);
        })
    }

    game_start(obj){

        this.button_start.remove();
        this.title.remove();
        let square_game = document.getElementById("container_game");
        square_game.remove();
        let clients = {}
        this.socket.emit("Button_Start", true);

        //alert(args);

       // console.log(this.button_start.textContent);
        //this.wait();


        //console.log(socket.readyState())

        //socket.send("Привет");

        // let game = new Meine_Spiele();
        // game.start_games();
    }
}

