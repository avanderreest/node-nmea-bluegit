var Helper = require("../Helper.js");

/** 

 === HDT - Heading true. ===

  ------------------------------------------------------------------------------
 *********1    2 3   
 *********|    | |   
 $--HDT, x.x, T*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Heading
 2    = Degrees true
 3    = Checksum
 */
var _heading;

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "HDT";
    this.talker_type_desc = "Heading true";

    this.parse = function(fields) {

        if(fields.length < 2) {
            throw new Error('HDT : not enough tokens');
        }

        exports._heading = parseFloat(fields[1]);

        return {
            id : this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            heading : fields[1],
            degrees_true : fields[2]
        };
    };

};