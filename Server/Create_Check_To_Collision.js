

module.exports = function Create_Check_To_Collision(Main_obj, collection_Obj,ogr){
    let elem = 0;
    let min_distance = -1;
    let this_distance = 0;

    let Object_for_Check_Collision = [];

    for(let el of collection_Obj){
        if(Main_obj === el)
            continue;
        this_distance = Math.sqrt(Math.pow(Main_obj.center_x - el.center_x,2) + Math.pow(Main_obj.center_y - el.center_y,2))
        if(this_distance <= ogr)
            Object_for_Check_Collision.push(el);
    }


    Object_for_Check_Collision.sort( function (a,b){
        let distanceA = Math.sqrt(Math.pow(Main_obj.center_x - a.center_x, 2) + Math.pow(Main_obj.center_y - a.center_y, 2));
        let distanceB = Math.sqrt(Math.pow(Main_obj.center_x - b.center_x, 2) + Math.pow(Main_obj.center_y - b.center_y, 2));

        if (distanceA < distanceB) {
            return -1;
        } else if (distanceA > distanceB) {
            return 1;
        } else {
            return 0;
        }
    })

    return Object_for_Check_Collision;
}

