/*
 ===  RPM – Revolutions ===
 ------------------------------------------------------------------------------
 *******   1  2  3    4    5
 *******  |  |  |    |    | 
 $--RPM, a, x, x.x, x.x, A*hh<CR><LF>
 ------------------------------------------------------------------------------
 Field Number:
 1. Source, shaft/engine S/E
 2. Engine or shaft number, numbered from centre-line. odd = starboard, even = port, 0 = single or on centre-line
 3. Speed, revolutions/min, "-" = counter-clockwise
 4. Propeller pitch, % of maximum, "-" = astern
 5. Status: A = data valid V = data invalid
*/

/*
 ===  XDR – Revolutions ===
 ------------------------------------------------------------------------------
 *******   1  2  3   4    
 *******  |  |  |   |     
 $--XDR, T, x, R, RPM*hh<CR><LF>
 ------------------------------------------------------------------------------
 Field Number:
 1. T = tachometer, C = temperature, A = angular displacement
 2. value of revolutions per minute
 3. C = Degrees Celcius, R = Revolutions per minute
 4. RPM
*/

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "XDR";
    this.talker_type_desc = "Revolutions";

    this.parse = function (fields) {
        if (fields.length < 5) {
            throw new Error('XDR : not enough fields');
        }

        // this._status = function(char){
        //     switch(char){
        //         case "A" : return "data valid"
        //         case "V" : return "data not valid"
        //     }
        // };

        // this._source = function(char){
        //     switch(char){
        //         case "S" : return "Shaft"
        //         case "E" : return "Engine"
        //     }
        // };

        // this._number = function(num){
        //     switch(parseInt(num)){
        //         case 0 : return "on centre-line"
        //         case (num % 2 === 0) : return "Starboard"
        //         case (num % 2 != 0) : return "Port"
        //     }
        // };

        // exports._source = this._source(fields[1]);
        // exports._number = fields[2];
        // exports._rpm = fields[3];
        // exports._proppitch = fields[4];
        // exports._status = this._status(fields[5]);

        exports._rpm = parseFloat(fields[2]);

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            speed_rpm: fields[2]
            



            // source: this._source(fields[1]),
            // number: this._number(fields[2]),
            // speed_rpm: fields[3],
            // propeller_pitch: fields[4],
            // status: this._status(fields[5])
        };
    };
    
};
