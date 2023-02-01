
/*
 ===  HCR – Heading correction report ===

 ------------------------------------------------------------------------------
 *******  1  2 3  4       
 *******  |  | |  |  
 $--HCR,x.x,a,a,x.x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Heading, degrees true
 2. Mode indicator
 3. Correction state
 4. Correction value

 2) Mode indicator. This field should not be null.
        A = Autonomous
        E = Estimated (dead reckoning)
        M = Manual input
        S = Simulator mode
        V = Data not valid (including standby)
3) Correction state. This field should not be null.
        A = Both Speed/latitude and dynamic correction included in heading
        D = Dynamic correction included in heading
        S = Speed/latitude correction included in heading
        N = No correction included in heading
        V = Not available, reporting device does not know about correction state
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "HCR";
    this.talker_type_desc = "Heading correction report";

    this.parse = function (fields) {
        if (fields.length < 3) {
            throw new Error('HCR : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            heading_deg_true: fields[1],
            mode_indicator: fields[2],
            correction_state: fields[3],
            correction_value: fields[4]
        };
    };
    
};