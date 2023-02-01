/*
 ===  MTW – Water temperature ===

 ------------------------------------------------------------------------------
 *******    1          
 *******  |   |   
 $--MTW, x.x, C*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Temperature, degrees C 
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "MTW";
    this.talker_type_desc = "Water Temperature";

    this.parse = function (fields) {
        if (fields.length < 2) {
            throw new Error('MTW : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            temp_deg_c: fields[1]
        };
    };
    
};