var Helper = require("../Helper.js");
//  ------------------------------------------------------------------------------
//  ******1 2 3   4        5 6 7  8  9   10  11 12  13  
//  ******| | |   |        | | |  |  |   |   |  |   |   
// $--ALF,x,x,x,hhmmss.ss,a,a,a,aaa,x.x,x.x,x.x,x,c--c*h<CR><LF>
//  ------------------------------------------------------------------------------
// ​
//  Field Number:
// ​ 1 : Total number of ALF sentences for this message, 1 to 2
//  2 : Sentence number, 1 to 2
//  3 : Sequential message identifier, 0 to 9
//  4 : Time of last change
//  5 : Alert category, A, B or C
//  6 : Alert priority, E, A, W or C (E: emergency alarm, A: alarm, C: caution, W: warning)
//  7 : Alert state, A, S, N, O, U, or V (V: active unacknowledged, S: silenced, A: active acknowledged, O: active responsibility transferred,
//      U: rectified unacknowledged, N: normal)
//  8 : Manufacturer mnemonic code
//  9 : Alert identifier (from 10000 to 9999999: reserved for proprietery non-standard alerts)
//  10 : Alert instance, 1 to 999999
//  11 : Revision counter, 1 to 99
//  12 : Escalation counter, 0 to 9
//  13 : Alert text - first ALF sentence transmits Alert title (MAX of 16 characters), optional second ALF message transmits additional alert description info,
//       second ALF uses null fields for the Time of last chnage (4), Alert category (5), Alert priority (6), and Alert state (7) - this way description info can 
//       be longer (MAX 82 characters in one sentence). 
//
// E.g: $IIALF,1,1,0,124304.50,A,W,A,,192,1,1,0,LOST TARGET*14<CR><LF>
//      $IIALF,2,1,1,081950.10,B,A,S,XYZ,0512,1,2,0,HEADING LOST*2D<CR><LF>
//      $IIALF,2,2,1,,,,,XYZ,0512,1,2,0,NO SYSTEM HEADING AVAILABLE*0D<CR><LF> 
//   


exports.Decoder = function (id) {
    this.id = id;
    this.talker_type_id = "ALF";
    this.talker_type_desc = "Alert sentence";

    this._priority = function(char){
          switch(char){
            case "E" : return "Emergency Alarm"
            case "A" : return "Alarm"
            case "W" : return "Warning"
            case "C" : return "Caution"
        }
    };

    this._state = function(char){
        switch(char){
            case "V" : return "Active - unacknowledged"
            case "S" : return "Active - silenced"
            case "A" : return "Active - acknowledged or active"
            case "O" : return "Active - responsibility transferred"
            case "U" : return "Rectified - unacknowledged"
            case "N" : return "Normal"
        }  
    };

    this._formatTime = function(time){
        if (time == ""){
            var formattedTime = ""
        }
        else{
            var h = time.substring(0,2);
            var m = time.substring(2,4);
            var s = time.substring(4,6);
            var ms = time.split('.')[1];
    
            var formattedTime = (h + ":" + m + ":" + s + "." + ms);
        }
        return (formattedTime)
    };

    this.parse = function (fields) {
        var i;
        if (fields.length < 13) {
            throw new Error('ALF : not enough fields');
        }

        
        exports._total_number_ALF_sentences = fields[1];
        exports._sentenceNumber = fields[2];
        exports._sequential_message_identifier = fields[3];
        exports._timeOfLastChange = this._formatTime(fields[4]);
        exports._alertCategory = fields[5];
        exports._alertPriority = fields[6];
        exports._alertPriorityText = this._priority(fields[6])
        exports._alertStateText = this._state(fields[7])
        exports._alertState = fields[7];
        exports._manMnemonic = fields[8];
        exports._alertIdentifier = fields[9];
        exports._alertInstance = fields[10];
        exports._revisionCounter = fields[11];
        exports._escalationCounter = fields[12];
        exports._alertText = fields[13];

        return {
            id: this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            total_number_ALF_sentences: fields[1],
            sentence_number: fields[2],
            sequential_message_identifier: fields[3],
            time_of_last_change: fields[4],
            alert_category: fields[5],
            alert_priority: fields[6],
            alert_state: fields[7],
            manufacturer_mnemonic: fields[8],
            alert_identifier: fields[9],
            alert_instance: fields[10],
            revision_counter: fields[11],
            escalation_counter: fields[12],
            alert_text: fields[13]
        };
    };

}