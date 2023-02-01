var Helper = require("../Helper.js");
/** 

 === ROT - Rate of turn. ===

  ------------------------------------------------------------------------------
 *********1    2 3   
 *********|    | |   
 $--ROT, x.x, A*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Rate of turn, degree minutes, "-" = bow turns to port
 2    = Status: A = data valid, V = data invalid
 3    = Checksum

 */
var _rot;

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = id.substring(0,3);
    this.talker_type_desc = "Rate of turn";

    this._status = function(char){
        switch(char){
            case "A" : return "data valid"
            case "V" : return "data not valid"
        }
    };


    this.parse = function(fields) {

        if(fields.length < 2) {
            throw new Error('ROT : not enough fields');
        }
        exports._rot = Helper.parseFloatX(fields[1]);
        
        return {
            id : this.id,
            talker_type_id : this.talker_type_id,
            talker_type_desc : this.talker_type_desc,
            rate_of_turn : Number(fields[1]),
            status : this._status(fields[2]) 
        };
    };
}