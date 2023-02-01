/*
 ===  VDR – Set and drift ===

 ------------------------------------------------------------------------------
 *******    1      2        3    
 ******* |   |   |   |    |  |  
 $ VDR, x.x, T, x.x, M, x.x, N*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Direction, degrees true
 2. Direction, degrees magnetic
 3. Current speed, knots
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "VDR";
    this.talker_type_desc = "Set and drift";

    this.parse = function (fields) {
        if (fields.length < 6) {
            throw new Error('VDR : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            direction_deg_true: fields[1],
            direction_deg_mag: fields[2],
            current_speed: fields[3]
        };
    };
    
};