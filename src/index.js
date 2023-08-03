import './styles.css'
import './getRandom'
const { io } = require("socket.io-client");
import  Init_game from "./Init_game";

let game = new Init_game();