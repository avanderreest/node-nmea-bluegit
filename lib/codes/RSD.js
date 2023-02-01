/*
 ===  RSD – Radar system data ===

 ------------------------------------------------------------------------------
 *******   1   2   3    4   5   6    7    8   9    10   11  12 13
 *******  |    |   |    |   |   |    |    |   |    |     |  |  |
 $--RSD, x.x, x.x,x.x, x.x,x.x, x.x,x.x, x.x,x.x, x.x, x.x, a, a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Origin 1 range, from own ship
 2. Origin 1 bearing degrees from 0°
 3. Variable range marker 1 (VRM1), range
 4. Bearing line 1 (EBL1), degrees from 0°
 5. Origin 2 range 
 6. Origin 2 bearing
 7. VRM 2, range
 8. EBL 2, degrees
 9. Cursor range, from own ship
 10. Cursor bearing, degrees clockwise from 0°
 11. Range scale in use
 12. Range units, K = km, N = nautical miles, S = statute miles
 13. Display rotation
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "RSD";
    this.talker_type_desc = "Radar system data";

    this.parse = function (fields) {
        if (fields.length < 9) {
            throw new Error('RSD : not enough fields');
        }


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
            origin_1_range: fields[1],
            origin_1_bearing_deg: fields[2],
            variable_range_marker: fields[3],
            bearing_line_1_deg_from: fields[4],
            origin_2_range: fields[5],
            origin_2_bearing: fields[6],
            vrm_2: fields[7],
            ebl_2: fields[8],
            cursor_range_from_ownship: fields[9],
            cursor_bearing: fields[10],
            range_scale: fields[11],
            range_units: fields[12],
            display_rotation: fields[13]
        };
    };
    
};