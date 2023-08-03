const canvas_me = require("../src/Size_canvas");

module.exports = function check_collision_square(x = 0, y = 0, type) {
    if (type === "plus") {
        if (x + (100) > canvas_me.width + 1)
            return true;
        else if (y + (100) > canvas_me.height + 1)
            return true;
    } else {
        if (x < -1)
            return true;
        else if (y < -1)
            return true;
    }
    return false;
}

