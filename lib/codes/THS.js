/*
 ===  THS – True Heading and Status ===

 ------------------------------------------------------------------------------
 *******   1  2    
 *******  |  |      
 $--THS,x.x,a*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Heading, degrees true
 2. Mode indicator


 1) Mode indicator. This field should not be null.
    A = Autonomous
    E = Estimated (dead reckoning)
    M = Manual input
    S = Simulator mode
    V = Data not valid (including standby)
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "THS";
    this.talker_type_desc = "True Heading and Status";

    this.parse = function (fields) {
        if (fields.length < 2) {
            throw new Error('THS : not enough fields');
        }

        this._mode = function(char){
            switch(char){
                case "A" : return "Autonomous"
                case "E" : return "Estimated (dead reckoning)"
                case "M" : return "Manual input"
                case "S" : return "Simulator mode"
                case "V" : return "Data not valid (including standby)"
            }
        };

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            heading_deg_true: fields[1],
            mode_indicator: this._mode(fields[2])
        };
    };
    
};