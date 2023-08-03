
module.exports = function Choose_Square_To_Plant(bomb,Square_Game){

    let elem = 0;
    let min_distance = -1;
    let this_distance = 0;

    for (let i of Square_Game.squares_cell){
        for(let j of i){
            if(j.type !== "clear") //Если будет два игрока, надо сделать, что одного игрока не спавнилась на другом
                continue;
            this_distance = Math.sqrt(Math.pow(Math.abs(j.start_x - bomb.start_x),2 )+ Math.pow(Math.abs(j.start_y - bomb.start_y),2))
            if(min_distance === -1){
                min_distance = this_distance;
                elem = j;
            }
            else if(this_distance < min_distance){
                min_distance = this_distance;
                elem = j;
            }
        }
    }
    if(min_distance > 150 || min_distance === -1) {
        return;
    }
    bomb.update_coord(elem.start_x,elem.start_y)
    elem.type = "bomb";
    bomb.cell_coord = elem;

}


