var Helper = require("../Helper.js");

/** 

 === RTE - Routes. ===

  ------------------------------------------------------------------------------
 ********1    2    3   4    5    6      7    8
 ********|    |    |   |    |    |      |    |
 $--RTE, x.x, x.x, a, c--c, c--c,...... c--c*hh<CR><LF>
 ------------------------------------------------------------------------------

 Field Number:

 1    = Total number of sentences being transmitted
 2    = Sentence number
 3    = Message mode: c = complete route, all waypoints, w = working route, first listed waypoint is "FROM", second is "TO" and remainig are rest of route
 4    = Route identifier
 5    = Waypoint identifier
 6    = Additonal waypoint identifiers
 7    = Waypoint "n" identifiers
 8    = Checksum
 */

exports.Decoder = function(id) {
    this.id = id;
    this.talker_type_id = "RTE";
    this.talker_type_desc = "Routes";

    this._mode = function(char){
        switch(char){
            case "c" : return "Complete route"
            case "w" : return "Working route";
        }
    };

    this.parse = function(fields) {
        if(fields.length < 6) {
            throw new Error('RTE : not enough fields');
        }
        exports._waypointId = fields[4]
        return {
            id : this.id,
            talker_type_id: this.talker_type_id,
            talker_type_desc: this.talker_type_desc,
            total_num_sentences : fields[1],
            sentence_num : fields[2],
            mode : this._mode(fields[3]),
            route_identifier : fields[4],
            wpt_identifier : fields[5],
            additional_wpt_identifiers : fields[6],
            wpt_n_identifiers : fields[7]
        };
    };

    this.latest = function (fields) {
        _total_num_sentences = fields[1];
        _sentence_num = fields[2];
        _mode = this._mode(fields[3]);
        _route_identifier = fields[4];
        _wpt_identifier = fields[5];
        _additional_wpt_identifiers = fields[6];
        _wpt_n_identifiers = fields[7];
        _data = [_total_num_sentences, _sentence_num, _mode, _route_identifier, _wpt_identifier, _additional_wpt_identifiers, _wpt_n_identifiers];
        _data = _data.join(', ')

        return{
            _data,
            _route_identifier,
            _wpt_identifier,
            _additional_wpt_identifiers,
            _wpt_n_identifiers
        };
    };
};