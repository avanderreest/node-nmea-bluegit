var Helper = require("../Helper.js");

/** 

 === VBW - Dual ground/water speed. ===

  ------------------------------------------------------------------------------
 ********1    2    3   4    5   6   7   8   9   10 11
 ********|    |    |   |    |   |   |   |   |   |  |
 $--VBW, x.x, x.x, A, x.x, x.x, A, x.x, A, x.x, A*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Longitudinal water speed, knots
 2    = Transverse water speed, knots
 3    = Status: water speed, A = data valid, V = data invalid
 4    = Longitudinal ground speed, knots
 5    = Transverse ground speed, knots
 6    = Status: ground speed, A = data valid, V = data invalid
 7    = Stern transverse water speed, knots
 8    = Status: stern water speed, A = data valid, V = data invalid
 9    = Stern transverse ground speed, knots
 10   = Status: stern ground speed, A = data valid, V = data invalid
 11   = Checksum

 */
var _groundSpeed;
var _waterSpeed;

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "VBW";
    this.talker_type_desc = "Dual ground/water speed";

    this._status = function(char){
        switch(char){
            case "A" : return "data valid"
            case "V" : return "data not valid"
        }
        return char
    };
    


    this.parse = function(fields) {
        if(fields.length < 10) {
            throw new Error('VBW : not enough tokens');
        }
        exports._groundSpeed = Helper.parseFloatX(fields[5]);
        exports._waterSpeed = Helper.parseFloatX(fields[2]);

        return {
            id : this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            longitudinal_water_speed : fields[1],
            transverse_water_speed : fields[2], 
            status_water_speed : this._status(fields[3]),
            longitudinal_ground_speed : fields[4],
            transverse_ground_speed : fields[5],
            status_ground_speed : this._status(fields[6]),

            stern_transverse_water_speed : fields[7],
            status_stern_water_speed : this._status(fields[8]),
            stern_transverse_ground_speed : fields[9],
            status_stern_ground_speed : this._status(fields[10])
        };
    };

    this.latest = function(fields){
        _groundSpeed = fields[5];
        _waterSpeed = fields[2];
        return{
            _groundSpeed,
            _waterSpeed
        };
    };
}