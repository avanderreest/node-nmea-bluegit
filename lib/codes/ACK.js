// Acknowledge Alarm 
// ------------------------------------------------------------------------------
//  ******1   2 
//  ******|   |   
// $--ACK,xxx*hh<CR><LF>
//  ------------------------------------------------------------------------------
// ​
//  Field Number:
// ​ 1 : Unique alarm number (identifier) at alarm source
//   

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "ACK";
    this.talker_type_desc = "Acknowledge Alert";

    this.parse = function (fields) {
        var i;
        if (fields.length < 1) {
            throw new Error('ACK : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            unique_alarm_number: fields[1]
        };
    };

}