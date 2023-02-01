/*
 ===  TLB – Target Label ===

 ------------------------------------------------------------------------------
 *******   1   2     3            3
 *******  |   |   |    |       |   |
 $--TLB,x.x,c--c,x.x,c--c,...x.x,c--c*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Target number ‘n’ reported by the device
 2. Label assigned to target ‘n’
 3. Additonal label pairs
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "TLB";
    this.talker_type_desc = "Target Label";

    this.parse = function (fields) {
        if (fields.length < 2) {
            throw new Error('TLB : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            target_number: fields[1],
            target_label: fields[2]
        };
    };
    
};