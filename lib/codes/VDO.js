/*
 ===  VDO – AIS VHF data-link own-vessel report ===

 ------------------------------------------------------------------------------
 *******  1 2 3 4 5  6   
 ******* | | | | |  |  
 !--VDO,x,x,x,a,s—s,x*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1. Total number of sentences needed to transfer the message, 1 to 9 
 2. Sentence Number 1 to 9
 3. Sequential message identifier, 0 to 9
 4. AIS channel
 5. Encapsulated ITU-R M.1371 radio message
 6. Number of fill-bits, 0 to 5
 */

exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "VDO";
    this.talker_type_desc = "AIS VHF data-link own-vessel report";

    this.parse = function (fields) {
        if (fields.length < 6) {
            throw new Error('VDO : not enough fields');
        }

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            total_num_sentences: fields[1],
            sentence_num: fields[2],
            sequential_message_identifier: fields[3],
            ais_channel: fields[4],
            encapsulated_radio_message: fields[5],
            number_of_fill_bits: fields[6],
        };
    };
    
};