
import MTV from "./MTV"

function GetCollision(Polyg_one, Polyg_two){
    let mtv = new MTV(null, 5000000)
    //let overlap = 5000000;
    //let smallest = null;
    let axes1 = Polyg_one.getAxes();
    let axes2 = Polyg_two.getAxes();
    if(!Get_overlap_und_smallest(Polyg_one,Polyg_two,mtv,axes1))
        return false;
    if(!Get_overlap_und_smallest(Polyg_one,Polyg_two,mtv,axes2))
        return false;
    return mtv;

}


function Get_overlap_und_smallest(Polyg_one, Polyg_two,MTV,axes){
    for(let i = 0; i < axes.length; i++){
        let axis = axes[i];
        let p1 = Polyg_one.projection(axis);
        let p2 = Polyg_two.projection(axis);

        if(!p1.overlap(p2)){
            return false;
        }
        else{
            let o = p1.getOverlap(p2);
            if(o < MTV.overlap){
                MTV.overlap = o;
                MTV.smallest = axis;
            }
        }
    }
    return true;
}

export default GetCollision;