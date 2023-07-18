import './styles.css'
import './getRandom'

import {getRandom} from "./getRandom";
import Input from "./input"
import * as events from "events";
import cenvas from "./cenvas";
import  Init_game from "./Init_game";

const call_start_game = () => {
    alert("123");
}

let colorOne = "#A52A2A"
let colorTwo = "#00597d"

/*let body = document.getElementsByName("body");
let button_start = document.createElement("button");
let button_text = document.createTextNode("Click me to start");
button_start.appendChild(button_text);
button_start.onclick = call_start_game;
button_start.className = "start_game";*/


//document.body.appendChild(button_start);
let start_game = new Init_game();
// let divchik = document.createElement("div");
// let text = document.createTextNode("sosi");
// divchik.appendChild(text);

//document.body.appendChild(divchik);
// let [y,x] = [getRandom(6), getRandom(8)]
// let inst = new Input(x,y)
//let canves = new cenvas()
//canves.draw_init()
// document.addEventListener('keydown', {handleEvent : inst.handle.bind(inst)})


// let ctx = canvas_me.getContext('2d')
//
//
// ctx.fillStyle = colorOne
// ctx.beginPath()
// let react_one = ctx.fillRect((x * 100) + 25, (y * 100) + 25, 50,50);
// ctx.stroke()
// document.addEventListener('keydown',function (e){
//     if (e.code === 'KeyW'){
//         alert("YOU PUSH W!")
//     }
// })
//
// ctx.clearRect((x * 100) + 25,(y * 100) + 25,50,50)




//Нарисованный линии по приколу
// for ( let i = 100; i < 600; i += 100){
//     ctx.fillRect(0, i, 800,1)
// }
//
// for (let j = 100; j < 800; j +=100){
//     ctx.fillRect(j, 0, 1,600)
// }




