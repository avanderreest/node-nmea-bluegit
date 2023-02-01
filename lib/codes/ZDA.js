var Helper = require("../Helper.js");

/** 

 === ZDA - Time and date. ===

  ------------------------------------------------------------------------------
 *********1         2    3   4    5   6   7   
 *********|         |    |   |    |   |   |   
 $--ZDA, hhmmss.ss, xx, xx, xxxx, xx, xx*hh<CR><LF> 
 ------------------------------------------------------------------------------

 Field Number:

 1    = UTC
 2    = Day, 01 to 31 (UTC)
 3    = Month, 01 to 12 (UTC)
 4    = Year (UTC)
 5    = Local zone hours, 00h to +- 13h
 6    = Local zone minutes, 00h to +- 59
 7    = Checksum

 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = id.substring(0,3);
    this.talker_type_desc = "Time and date";


    this.parse = function(fields) {
        if(fields.length < 6) {
            throw new Error('ZDA : not enough fields');
        }
        return {
            id : this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            utc : Helper.encodeTime(fields[1]),
            day : fields[2],
            month : fields[3],
            year : fields[4],
            local_zone_hours : fields[5],
            local_zone_minutes : fields[6]
        };
    };
}