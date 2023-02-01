var Helper = require("../Helper.js");

/** 

 === ZTG - UTC and time to destination waypoint. ===

  ------------------------------------------------------------------------------
 *******  1  2  3  4  5  6  7      8      9  
 *******  |  |  |  |  |  |  |      |      |   
 $--PLAN  ,  ,  ,  ,  ,  ,  ,  ,  ,hrst*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = NULL (not used)
 2    = NULL (not used)
 3    = NULL (not used)
 4    = NULL (not used)
 5    = NULL (not used)
 6    = NULL (not used)
 7    = NULL (not used)
 8    = Heading reference stat. 1 = Gyro 1, 2 = Gyro 2, 3 = Magnetic, 4 = Gyro 3, 5 = Gyro 4
 9    = Checksum

 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "LAN";
    this.talker_type_desc = "Selected Gyro";

    this.parse = function(fields) {
        if(fields.length < 8) {
            throw new Error('LAN : not enough fields');
        }

        exports._time_to_go = Helper.encodeTime(fields[2]);

        return {
            id : fields[0],
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            selected_gyro : Number(fields[8])
        };
    };
};