/*
 ===  TTM – Tracked target message ===

 ------------------------------------------------------------------------------
 *******  1   2   3   4     5    6   7   8  9  10 11  12    13
 ******* |   |  |  |  |   |  |  |   |   |  |  |  |   |      |
 $--TTM,xx,x.x,x.x,a,x.x,x.x,a,x.x,x.x,a,c--c,a,a,hhmmss.ss,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Target number, 0 to 999
 2. Target distance from own ship
 3. Bearing from own ship, degrees true/relative (T/R)
 4. Target speed
 5. Target course, degrees true/relative (T/R)
 6. Distance of closest-point-of-approach
 7. Time to CPA, min., "-" increasing
 8. Speed/distance units, K/N/S
 9. Target name
 10. Target status
 11. Reference target 2) = R, null otherwise
 12. Time of data (UTC)
 13. Type of acquisition A = Automatic, M = manual, R = reported
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "TTM";
    this.talker_type_desc = "Tracked target message";

    this._type = function(char){
        switch(char){
            case "A" : return "Automatic"
            case "M" : return "Manual"
            case "R" : return "Reported"
        }
    };

    this.parse = function (fields) {
        if (fields.length < 15) {
            throw new Error('TTM : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            target_num: fields[1],
            target_distance_from_own_ship: fields[2],
            bearing_from_own_ship: fields[3] + fields[4],
            target_speed: fields[5],
            target_course: fields[6] + fields[7],
            distance_of_closest_approach: fields[8],
            time_to_CPA: field[9],
            speed_distance_units: fields[10],
            target_name: fields[11],
            target_status: fields[12],
            reference_target: fields[13],
            time_of_data: fields[14],
            type_of_acquisition: this._type(fields[15])
        };
    };
    
};