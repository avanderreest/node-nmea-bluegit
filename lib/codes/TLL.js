/*
 ===  TLL – Target latitude and longitude ===

 ------------------------------------------------------------------------------
 *******   1      2         3     4    5       6 7    
 *******  |    |   |    |     |   |    |       | |    
 $--TLL,xx,llll.ll,a,yyyyy.yy,a,c--c,hhmmss.ss,a,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Target number 00 – 99
 2. Target latitude, N/S
 3. Target longitude, E/W
 4. Target name
 5. UTC of data 
 6. Target status
 7. Reference target = R, null otherwise
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "TLL";
    this.talker_type_desc = "Target latitude and longitude";

    this.parse = function (fields) {
        if (fields.length < 9) {
            throw new Error('TLL : not enough fields');
        }


        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            target_num: fields[1],
            target_lat_ns: fields[2] + fields[3],
            target_lat_ew: fields[4] + fields[5],
            target_name: fields[6],
            utc_data: fields[7],
            target_status: fields[8],
            ref_target: fields[9]
        };
    };
    
};