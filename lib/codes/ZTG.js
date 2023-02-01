var Helper = require("../Helper.js");

/** 

 === ZTG - UTC and time to destination waypoint. ===

  ------------------------------------------------------------------------------
 *********1          2          3   4 
 *********|          |          |   | 
 $--ZTG, hhmmss.ss, hhmmss.ss, c--c*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = UTC of observation
 2    = Time to go, hh = 00 to 99
 3    = Destination to waypoint ID
 4    = Checksum

 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "ZTG";
    this.talker_type_desc = "UTC and time to destination waypoint";


    this.parse = function(fields) {
        if(fields.length < 3) {
            throw new Error('ZTG : not enough fields');
        }

        exports._time_to_go = Helper.encodeTime(fields[2]);

        return {
            id : fields[0],
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            utc_time : fields[1],
            time_to_go : Helper.encodeTime(fields[2]),
            destination_to_wypt_id : Number(fields[3])
        };
    };
};