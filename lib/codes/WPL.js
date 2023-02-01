var Helper = require("../Helper.js");

/** 

 === WPL - Waypoint location. ===

  ------------------------------------------------------------------------------
 ********1      2  3        4 5   6 
 ********|      |  |        | |   | 
 $--WPL,llll.ll,a,yyyyy.yy,a,c--c*hh<CR><LF> 
 ------------------------------------------------------------------------------

 Field Number:

 1    = Waypoint Latitude
 2    = N or S
 3    = Waypoint Longitude
 4    = E or W
 5    = Waypoint identifier
 6    = Checksum

 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = id.substring(0,3);
    this.talker_type_desc = "Waypoint location";


    this.parse = function(fields) {
        if(fields.length < 5) {
            throw new Error('WPL : not enough tokens');
        }
        return {
            id : this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            latitude : Helper.parseLatitude(fields[1], fields[2]),
            longitude : Helper.parseLongitude(fields[3], fields[4]),
            wpt_identifier : fields[5]
        };
    };

}