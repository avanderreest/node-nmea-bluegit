var Helper = require("../Helper.js");

/*
 === GNS - GNSS fix data ===

 ------------------------------------------------------------------------------
 *******   1             2          3     4    5   6  7   8   9  10  11  
 *******   |          |    |    |     |   |   |   |   |   |   |   |  |
 $--GNS, hhmmss.ss,llll.ll,a,yyyyy.yy,a,c--c,xx,x.x,x.x,x.x,x.x,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. UTC of position
 2. Latitude, N/S
 3. Longitude, E/W
 4. Mode indicator
 5. Total number of satellites in use, 00-99
 6. HDOP
 7. Antenna altitude, m, re: mean-sea-level (geoid)
 8. Geoidal separation, m
 9. Age of differential data 
 10. Differential reference station ID 
 11. Navigational status indicator
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "GNS";
    this.talker_type_desc = "GNSS fix data";
    this._localDatum = function(char){
          switch(char){
            case "W84" : return "WGS84"
            case "W72" : return "WGS72"
            case "S85" : return "SGS85"
            case "P90" : return "PE90"
            case "999" : return "User defined"
        }
    };

    this.parse = function (fields) {
        if (fields.length < 11) {
            throw new Error('GNS : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            utc_of_position: fields[1],
            latitude_NS: fields[2],
            longitude_EW: fields[3],
            mode_indicator: fields[4],
            total_number_of_satellites_use: fields[5],
            hdop: fields[6],
            antenna_altitude: fields[7],
            geodial_seperation: fields[8],
            age_of_diff_data: fields[9],
            diff_data_ref_station_id: fields[10],
            nav_status_indicator: fields[11]
        };
    };
    
};