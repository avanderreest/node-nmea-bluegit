var Helper = require("../Helper.js");

/** 

 === ZTG - UTC and time to destination waypoint. ===

  ------------------------------------------------------------------------------
 *********1     2    3   4
 *********|     |    |   | 
 $--PLAR, x.x, x.x, x.x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Roll in degrees "-" = port down
 2    = Pitch in degrees "-" = bow down
 3    = Heave in meter "-" = LKF System above average sea level
 4    = Checksum


 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "LAR";
    this.talker_type_desc = "Gyro Compass";


    this.parse = function(fields) {
        if(fields.length < 4) {
            throw new Error('LAR : not enough fields');
        }

        exports._time_to_go = Helper.encodeTime(fields[2]);

        return {
            id : fields[0],
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            roll : fields[1],
            pitch : fields[2],
            heave : fields[3]
        };
    };
};