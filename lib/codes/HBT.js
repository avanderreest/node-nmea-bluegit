
/*
 === HBT – Heartbeat supervision sentence ===

 ------------------------------------------------------------------------------
 ******* 1   2  3       
 ******* |  |  |  
 $--HBT,x.x,A,x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Configured repeat interval
 2. Equipment status
 3. Sequential sentence identifier
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "HBT";
    this.talker_type_desc = "Heartbeat supervision sentence";

    this.parse = function (fields) {
        if (fields.length < 3) {
            throw new Error('HBT : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            config_repeat_interval: fields[1],
            equipment_status: fields[2],
            sequential_sentence_identifier: fields[3]
        };
    };
    
};