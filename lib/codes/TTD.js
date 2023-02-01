/*
 ===  TTD – Tracked Target Data ===

 ------------------------------------------------------------------------------
 *******  1  2 3   4  5        
 ******* |  | |   |  |   
 !--TTD,hh,hh,x,s—s,x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Total hex number of sentences needed to transfer the message, 01 to FF
 2. Hex sentence number, 01 to FF
 3. Sequential message identifier, 0 to 9
 4. Encapsulated tracked target data
 5. Number of fill-bits, 0 to 5
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "TTD";
    this.talker_type_desc = "Tracked Target Data";

    this.parse = function (fields) {
        if (fields.length < 5) {
            throw new Error('TTD : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            total_hex_num_of_sentences: fields[1],
            hex_sentence_num: fields[2],
            sequential_message_identifier: fields[3],
            encapsulated_tracked_target_data: fields[4],
            num_of_fill_bits: fields[5],
        };
    };
    
};