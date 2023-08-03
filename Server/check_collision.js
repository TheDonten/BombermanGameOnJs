// import Polygons from "../src/Shape/Polygons";
// import GetCollision from "../src/Colisision/GetCollision";
// import Bombs from "../src/Object_Game/Bombs/Bombs";
const Polygons = require ("../src/Shape/Polygons");
const GetCollision = require("../src/Colisision/GetCollision")
const Bombs = require("../src/Object_Game/Bombs/Bombs")

function delete_bomb(el_inParent,el){
    for(let i = 0; i < el_inParent.length; i++){
        if(el === el_inParent[i]) {
            el_inParent.splice(i, 1)
            return true;
        }
    }
    return false;
}

module.exports = function check_collision(Main_Obj, Collection_Obj){
    let out_put = []
    for(let el of Collection_Obj){
        let MTV = [];
        if(el instanceof Polygons && !(Main_Obj instanceof Polygons)) {
            MTV = GetCollision(Main_Obj.Polygons,el);
        }
        else if(el instanceof Polygons && Main_Obj instanceof Polygons){
            MTV = GetCollision(Main_Obj, el);
        }
        else if(Main_Obj instanceof  Polygons && !(el instanceof Polygons)){
            MTV = GetCollision(Main_Obj,el.Polygons);
        }
        else {
            MTV = GetCollision(Main_Obj.Polygons,el.Polygons);
        }
        if(MTV.overlap === 0 && el instanceof Bombs) {
            //console.log(Main_Obj.InPlantBombs);
            if(Main_Obj.InPlantBombs !== undefined && delete_bomb(Main_Obj.InPlantBombs,el))
            // if(el.Player_Parent !== undefined &&this.delete_bomb(el.Player_Parent.InPlantBombs,el))
            //     el.Player_Parent = undefined;
            continue;
        }

        if(MTV !== false && MTV.overlap >0) {
            out_put.push([MTV,el]);
        }
    }
    if(out_put.length === 0)
        return [];
    else
        return out_put;
}

