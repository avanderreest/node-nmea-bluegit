/*
 ===  RSA – Rudder Sensor Angle ===

 ------------------------------------------------------------------------------
 *******  1   2   3   4 
 *******  |   |   |   |   
 $--RSA, x.x, A, x.x, A*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Starboard (or single) rudder sensor, Status A = data valid, V = data invalid
 2. Port rudder sensor, Status A = data valid, V = data invalid
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "RSA";
    this.talker_type_desc = "Rudder Sensor Angle";

    this.parse = function (fields) {
        if (fields.length < 4) {
            throw new Error('RSA : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            starboard_rudder_sensor_angle: fields[1], // float
            starboard_rudder_sensor_status: fields[2],           
            port_rudder_sensor_angle: fields[3], // float
            port_rudder_sensor_status: fields[4]
        };
    };
    
};