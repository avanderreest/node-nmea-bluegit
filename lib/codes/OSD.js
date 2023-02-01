/*
 ===  OSD – Own ship data ===

 ------------------------------------------------------------------------------
 *******   1  2  3   4  5  6  7   8  9
 *******  |  |  |   |  |  |  |   |   |
 $--OSD, x.x,A,x.x, a,x.x,a,x.x,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Heading, degrees true
 2. Heading status: A = data valid, V = data invalid
 3. Vessel course, degrees true
 4. Course reference, B/M/W/R/P
 5. Vessel speed
 6. Speed reference, B/M/W/R/P
 7. Vessel set, degrees true
 8. Vessel drift (speed)
 9. Speed units, K = km/h; N = knots; S = statute miles/h
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "OSD";
    this.talker_type_desc = "Own ship data";


    this.parse = function (fields) {
        if (fields.length < 9) {
            throw new Error('OSD : not enough fields');
        }

        this._status = function(char){
            switch(char){
                case "A" : return "data valid"
                case "V" : return "data not valid"
            }
        };

        this._units = function(char){
            switch(char){
                case "K" : return "km/h"
                case "N" : return "Knots"
                case "S" : return "miles/h"
            }
        };

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            heading_deg_true: fields[1],
            heading_status: this._status(fields[2]),
            vessel_course: fields[3],
            course_ref: fields[4],
            vessel_speed: fields[5],
            speed_ref: fields[6],
            vessel_set_deg_true: fields[7],
            vessel_drift: fields[8],
            speed_units: fields[9]
        };
    };
    
};