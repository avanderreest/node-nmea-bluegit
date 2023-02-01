var Helper = require("../Helper.js");

/*
 ------------------------------------------------------------------------------
 ********1  2  3  4  5  6  7  8 9
 ********|  |  |  |  |  |  |  | |
$--MWD, x.x,T,x.x,M,x.x,N,x.x,M*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Wind direction, 0° to 359°
 2. True
 3. Wind direction, 0° to 359°
 4. Magnetic
 5. Wind speed
 6. Knots
 7. Wind speed
 8. M/s
 9. Checksum
 */
var _windSpeed;
var _windDirection;

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "MWD";
    this.talker_type_desc = "Wind direction and speed";
    this._unit = function(char){
          switch(char){
            case "N" : return "knots"
            case "M" : return "meters per second"
            case "K" : return "kilometers per hour"
        }
    };
    this._reference = function(char){
        switch(char){
            case "T" : return "true"
            case "R" : return "relative"
            case "M" : return "magnetic"
        }  
    };

    this.parse = function (tokens) {
        var i;
        if (tokens.length < 8) {
            throw new Error('MWD : not enough tokens');
        }

        // trim whitespace
        // some parsers may not want the tokens trimmed so the individual parser has to do it if applicable
        for (i = 0; i < tokens.length; ++i) {
            tokens[i] = tokens[i].trim();
        }

        exports._windDirection = Helper.parseFloatX(tokens[1]);
        exports._windSpeed = Helper.parseFloatX(tokens[5]); 

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            true_wind_direction: Helper.parseFloatX(tokens[1]),
            reference1: this._reference(tokens[2]),
            magnetic_wind_direction: Helper.parseFloatX(tokens[3]),
            reference2: this._reference(tokens[4]),
            knots_wind_speed: Helper.parseFloatX(tokens[5]),
            units1: this._unit(tokens[6]),
            meters_wind_speed: Helper.parseFloatX(tokens[7]),
            units2: this._unit(tokens[8])
        };
    };
}
