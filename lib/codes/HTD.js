var Helper = require("../Helper.js");

/** 

 === HTD - UTC and time to destination waypoint. ===

  ------------------------------------------------------------------------------
 *********1  2    3  4  5  6    7    8    9    10   11   12   13 14 15 16 17 18   
 *********|  |    |  |  |  |    |    |    |    |    |    |    |  |  |  |  |  |
 $--HTD,  A, x.x, a, a, a, x.x, x.x, x.x, x.x, x.x, x.x, x.x, a, A, A, A, x.x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Overide A=in use V=not in use
 2    = Commanded rudder angle, degrees
 3    = Commanded rudder direction, L/R = port/starboard
 4    = Selelected steering mode
 5    = Turn mode R = radius controlled, T = Turn rate controlled, N = turn is not controlled
 6    = Commanded rudder limit, degrees (unsigned)
 7    = Commanded off-heading limit, degrees (unsigned)
 8    = Commanded radius of turn for heading changes, n.miles
 9    = Commanded rate of turn for heading changes, dgr/min
 10   = Commanded heading-to-stear, degrees
 11   = Commanded off-track limit n.miles (unsigned)
 12   = Commander track, degreed
 13   = Heading Reference in use, T/M
 14   = Rudder status. A = with limits, V = Limit reached or exceeded
 15   = Off-heading status
 16   = Off-track status
 17   = Vessel heading, degrees
 18   = Checksum
 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "HTD";
    this.talker_type_desc = "Autopilot";


    this.parse = function(fields) {
        if(fields.length < 3) {
            throw new Error('HTD : not enough fields');
        }

        exports._time_to_go = Helper.encodeTime(fields[2]);

        return {
            id : fields[0],
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            overide : fields[1],
            cmd_rudder_angle : Number (fields[2]),
            cmd_rudder_direction : fields[3],
            selected_steering_mode : fields[4],
            turn_mode  : fields[5],
            cmd_rudder_limit : Number (fields[6]),
            cmd_off_heading_limit : Number (fields[7]),
            cmd_radius_of_turn_for_heading_changes : Number(fields[8]),
            cmd_rate_of_turn_for_heading_changes : Number(fields[9]),
            cmd_heading_to_stear : Number(fields[10]),
            cmd_off_track_limit : Number(fields[11]),
            cmd_track : Number(fields[12]),
            heading_reference_use : fields[13],
            rudder_status : fields[14],
            off_heading_status : fields[15],
            off_track_status : fields[16],
            vessel_heading : Number(fields[17])
        };
    };
};
