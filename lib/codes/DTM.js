var Helper = require("../Helper.js");

/*
 === DTM - Datum reference ===

 ------------------------------------------------------------------------------
 ******* 1   2    3     4   5   6  
 ******* |   |  |  |  |  |  |   |  
 $--DTM,ccc,a,x.x,a,x.x,a, x.x,ccc*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Local Datum: (WGS84 = W84, WGS72 = W72, SGS85 = S85, PE90 = P90, User defined = 999, IHO datum code)
 2. Local datum subdivision code
 3. Lat offset, min, N/S
 4. Lon offset, min, E/W
 5. Altitude offset, m
 6. Reference datum
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "DTM";
    this.talker_type_desc = "Datum reference";
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
        if (fields.length < 6) {
            throw new Error('DTM : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            local_datum: this._localDatum(fields[1]),
            local_datum_sub_code: fields[2],
            lat_offset_NS: fields[3],
            lat_offset_EW: fields[4],
            altitude_offset: fields[5],
            ref_datum: fields[6]
        };
    };
    
};