

const express = require('express');
const webpack = require('webpack');
const state_server = require('./state_server');
const Server_Loop = require("./Server/Server_loop")

const app = express();
const config = require("./webpack.config")
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {wetag} = require("express/lib/utils");
const {stat} = require("@babel/core/lib/gensync-utils/fs");

const io = new Server(server);
let socketss = new Map();

let update = false;

let sockets_status = {
    id : 0,
    isButtonPlay : false,
    Player : {},
    Square_Game : {},
    NickName : "typo"

}

let Server_Loop_this = {};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

function GameOver(sockets){
    for(let i of sockets.keys()){
        i.emit("GameOver", true);
        sockets.get(i).isButtonPlay = false;
    }
}
io.on('connection', (socket) => {
    console.log("user_connection");
    state_server.count_connection++;
    io.emit("Update_await_player+", state_server.count_connection);
    console.log(state_server.count_connection);
    socket.on("GetCountPlayer", (args,callback)=>{
        callback(socketss.size);
    })
    socket.on("NewWaitRoom", (args,callback)=>{
        callback(socketss.size);
    })
    socket.on('disconnect', () => {
        state_server.count_connection--;
        console.log(state_server.count_connection);
        io.emit("Update_await_player-", state_server.count_connection);
        if(socketss.has(socket)) {
            console.log("delete and disconnect")
            Server_Loop_this.isPlaying = false;
            update = true;
            socketss.delete(socket);
            GameOver(socketss);
        }
        console.log('user disconnected');
    });
    socket.on('Button_Start', (args) =>{
        socketss.get(socket).isButtonPlay = args;
        if(check_to_all_click_button(socketss)) {
            Server_Loop_this = new Server_Loop();
            listen_to_start();
        }
    })
    if(state_server.count_connection <= 2){
        sockets_status.id = state_server.count_connection;
        sockets_status.isButtonPlay = false;
        socketss.set(socket,{...sockets_status});
    }
    if(state_server.count_connection === 2){
        for(let socketMe of socketss.keys()){
            socketMe.emit("Start", true);
        }
    }
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function check_to_all_click_button(sockets){
    if(sockets.size === 0)
        return false;
    for (let key of sockets.keys()){

        if(!sockets.get(key).isButtonPlay)
            return false;
    }
    return true;
}
async function listen_to_start(){
    console.log("Listen Start!")
    while(true){
        await sleep(1000);
        if(check_to_all_click_button(socketss))
            break;
        if(update) {
            console.log("Was Updating");
            return;
        }
    }
    console.log("Game is Start");
    let count = 0;

    Server_Loop_this.init();
    for (let key of socketss.keys()){
        socketss.get(key).Player = Server_Loop_this.Players_observ[count];
        socketss.get(key).Square_Game = Server_Loop_this.Square_Game;
        key.emit("Init", socketss.get(key));
        count++;
    }
    console.log("Game is Init");
    Server_Loop_this.setSocketPlayer(socketss);
    await Server_Loop_this.Playing();
    console.log("Game End");
}