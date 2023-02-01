/*
 ===  XDR – Transducer measurements ===

 ------------------------------------------------------------------------------
 *******  1  2  3  4          5            6  
 ******* |  |  |  |     |         |   |       | 
 $--XDR,a,x.x,a,c--c,................a,x.x,a,c--c*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Transducer type, transducer No. 1
 2. Measurement data, transducer No. 1
 3. Units of measure, transducer No. 1
 4. Transducer No.1 ID
 5. Data, variable number of transducers
 6. Transducer "n"
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "XDR";
    this.talker_type_desc = "Transducer measurements";

    this.parse = function (fields) {
        if (fields.length < 6) {
            throw new Error('XDR : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            transducer_type: fields[1],
            measurement_data: fields[2],
            units_of_measure: fields[3],
            transducer_id: fields[4],
            data: fields[5],
            transducer_n: fields[6],
        };
    };
    
};