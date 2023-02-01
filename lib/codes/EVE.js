/*
 ===  EVE – General event message ===

 ------------------------------------------------------------------------------
 *******    1      2      3  
 *******   |       |     |   
 $--EVE,hhmmss.ss,c--c,c--c*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Event time
 2. Tag code used for identification of source of event
 3. Event description
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "EVE";
    this.talker_type_desc = "General event message";

    this.parse = function (fields) {
        if (fields.length < 3) {
            throw new Error('EVE : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            event_time: fields[1],
            tag_code: fields[2],
            event_description: fields[3]
        };
    };
    
};