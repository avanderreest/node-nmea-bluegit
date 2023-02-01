/*
 ===  HSC – Heading steering command ===

 ------------------------------------------------------------------------------
 *******   1      2   3  
 ******* |  |   |  | |
 $--HSC,x.x,T,x.x,M,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Commanded heading degrees true
 2. Commanded heading, degrees magnetic
 3. Sentence status flag
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "HSC";
    this.talker_type_desc = "Heading steering command";

    this.parse = function (fields) {
        if (fields.length < 5) {
            throw new Error('HSC : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            heading_deg_true: fields[1] + fields[2],
            heading_deg_mag: fields[3] + fields[4],
            sentence_status_flag: fields[5]
        };
    };
    
};