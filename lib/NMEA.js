/** NMEA-0183 Parser-Encoder */

var ACK = require("./codes/ACK.js");
var DTM = require("./codes/DTM.js");
var EVE = require("./codes/EVE.js");
var GND = require("./codes/GND.js");
var HBT = require("./codes/HBT.js");
var HCR = require("./codes/HCR.js");
var HSC = require("./codes/HSC.js");
var MTW = require("./codes/MTW.js"); 
var OSD = require("./codes/OSD.js"); 
var RSD = require("./codes/RSD.js"); 
var THS = require("./codes/THS.js"); 
var TLB = require("./codes/TLB.js"); 
var TLL = require("./codes/TLL.js"); 
var TTD = require("./codes/TTD.js"); 
var TTM = require("./codes/TTM.js"); 
var VDM = require("./codes/VDM.js"); 
var VDO = require("./codes/VDO.js"); 
var VDR = require("./codes/VDR.js"); 
var XDR = require("./codes/XDR.js"); 
var ALF = require("./codes/ALF.js");
var RMC = require("./codes/RMC.js");
var GLL = require("./codes/GLL.js");
var GGA = require("./codes/GGA.js");
var GSV = require("./codes/GSV.js");
var GSA = require("./codes/GSA.js");
var VTG = require("./codes/VTG.js");
var ROT = require("./codes/ROT.js");
var RPM = require("./codes/RPM.js");
var WPL = require("./codes/WPL.js");
var ZDA = require("./codes/ZDA.js");
var ZTG = require("./codes/ZTG.js");
var HDT = require("./codes/HDT.js");
var MWD = require("./codes/MWD.js");
var MWV = require("./codes/MWV.js");
var DBT = require("./codes/DBT.js");
var RTE = require("./codes/RTE.js");
var HDG = require("./codes/HDG.js");
var VHW = require("./codes/VHW.js");
var VWR = require("./codes/VWR.js");
var VBW = require("./codes/VBW.js");
var LAN = require("./codes/LAN.js");
var LAR = require("./codes/LAR.js");
var HTD = require("./codes/HTD.js");
var RSA = require("./codes/RSA.js");

var Helper = require("./Helper.js");
const { DEFAULT_MAX_VERSION } = require("tls");

/** NMEA module */
var NMEA = ( function() {

    "use strict";

    /** NMEA public API */
    var nmea = {
    };

    /** private module variables */
    var m_parserList = [];
    var m_encoderList = [];
    var m_errorHandler = null;

    // =============================================
    // public API functions
    // =============================================

    // function to add parsers
    nmea.addParser = function(sentenceParser) {
        if(sentenceParser === null) {
            this.error('invalid sentence parser : null');
            return;
        }
        m_parserList.push(sentenceParser);
    };

    /** function to add encoders */
    nmea.addEncoder = function(sentenceEncoder) {
        if(sentenceEncoder === null) {
            this.error('invalid  sentence encoder : null');
            return;
        }
        m_encoderList.push(sentenceEncoder);
    };

    /** master parser function
     * handle string tokenizing, find the associated parser and call it if there is one
     */
    nmea.parse = function(sentence) {
        var i;
        var tokens;
        var id;
        var result;
        var checksum;
        var status;
        if(( typeof sentence) !== 'string') {
            this.error('sentence is not a string');
            return null;
        }

        // find the checksum and remove it prior to tokenizing
        checksum = sentence.split('*');
        if(checksum.length === 2) {
            // there is a checksum
            sentence = checksum[0];
            checksum = checksum[1];
        } else {
            checksum = null;
        }

        tokens = sentence.split(',');
        if(tokens.length < 1) {
            this.error('must at least have a header');
            return null;
        }

        // design decision: the 5 character header field determines the sentence type
        // this field could be handled in two different ways
        // 1. split it into the 2 character 'talker id' + 3 character 'sentence id' e.g. $GPGGA : talker=GP id=GGA
        //    this would leave more room for customization of proprietary talkers that give standard sentences,
        //    but it would be more complex to deal with
        // 2. handle it as a single 5 character id string
        //    much simpler.  for a proprietary talker + standard string, just instantiate the parser twice
        // This version implements approach #2
        id = tokens[0].substring(1);
        if(id.length !== 5) {
            this.error('i must be exactly 5 characters');
            return null;
        }

        // checksum format = *HH where HH are hex digits that convert to a 1 byte value
        if(checksum !== null) {
            // there is a checksum, replace the last token and verify the checksum
            status = Helper.verifyChecksum(sentence, checksum);
            if(status === false) {
                this.error('checksum mismatch');
                return null;
            }
        }

        // try all id's until one matches
        result = null;
        for( i = 0; i < m_parserList.length; ++i) {
            if(id === m_parserList[i].id) {
                try {
                    result = m_parserList[i].parse(tokens);
                } catch(err) {
                    nmea.error(err.message);
                }
                break;
            }
        }
        if(result === null) {
            this.error('sentence id not found');
        }
        return result;
    };

    /** master encoder
     * find the specified id encoder and give it the data to encode. return the result;
     */
    nmea.encode = function(id, data) {
        var i;
        var result;
        var cks;
        result = null;
        for( i = 0; i < m_encoderList.length; ++i) {
            if(id === m_encoderList[i].id) {
                try {
                    result = m_encoderList[i].encode(id, data);
                } catch(err) {
                    nmea.error(err.message);
                }
            }
        }
        if(result === null) {
            this.error('sentence id not found');
            return null;
        }

        // add the checksum
        cks = Helper.computeChecksum(result);
        result = result + cks;

        return result;
    };

    /** public function to print/handle errors */
    nmea.error = function(msg) {
        if(m_errorHandler !== null) {
            // call the existing handler
            m_errorHandler(msg);
        }
    };

    /** public function to  set error handler */
    nmea.setErrorHandler = function(e) {
        m_errorHandler = e;
    };

    // =======================================================
    // initialize the handlers
    // =======================================================

    // add the standard error handler
    nmea.setErrorHandler(function(e) {
        throw new Error('ERROR:' + e);
    });

    // add the standard decoders
         nmea.addParser(new GGA.Decoder("GPGGA"));
         nmea.addParser(new GGA.Decoder("GNGGA"));
         nmea.addParser(new RMC.Decoder("GPRMC"));
         nmea.addParser(new GSV.Decoder("GPGSV"));
         nmea.addParser(new GSA.Decoder("GPGSA"));
         nmea.addParser(new VTG.Decoder("GPVTG"));
         nmea.addParser(new MWV.Decoder("IIMWV"));
         nmea.addParser(new MWV.Decoder("WIMWV"));
         nmea.addParser(new DBT.Decoder("IIDBT"));
         nmea.addParser(new DBT.Decoder("SDDBT"));
         nmea.addParser(new GLL.Decoder("GPGLL"));
         nmea.addParser(new HDG.Decoder("HCHDG"));
         nmea.addParser(new VHW.Decoder("IIVHW"));
         nmea.addParser(new VWR.Decoder("IIVWR"));
     // add the standard encoders
         nmea.addEncoder(new GGA.Encoder("GPGGA"));
         nmea.addEncoder(new RMC.Encoder("GPRMC"));
    
        nmea.addParser(new ALF.Decoder("ACK"));
        nmea.addParser(new ALF.Decoder("DTM"));
        nmea.addParser(new ALF.Decoder("EVE"));
        nmea.addParser(new ALF.Decoder("GND"));
        nmea.addParser(new ALF.Decoder("HBT"));
        nmea.addParser(new ALF.Decoder("HCR"));
        nmea.addParser(new ALF.Decoder("HSC"));
        nmea.addParser(new ALF.Decoder("MTW"));
        nmea.addParser(new ALF.Decoder("OSD"));
        nmea.addParser(new ALF.Decoder("RSD"));
        nmea.addParser(new ALF.Decoder("THS"));
        nmea.addParser(new ALF.Decoder("TLB"));
        nmea.addParser(new ALF.Decoder("TLL"));
        nmea.addParser(new ALF.Decoder("TTD"));
        nmea.addParser(new ALF.Decoder("TTM"));
        nmea.addParser(new ALF.Decoder("VDM"));
        nmea.addParser(new ALF.Decoder("VDO"));
        nmea.addParser(new ALF.Decoder("VDR"));
        nmea.addParser(new ALF.Decoder("XDR"));
        nmea.addParser(new ALF.Decoder("ALF"));
        nmea.addParser(new GGA.Decoder("GGA"));
        nmea.addParser(new HDT.Decoder("HDT"));
        nmea.addParser(new RMC.Decoder("RMC"));
        nmea.addParser(new GSV.Decoder("GSV"));
        nmea.addParser(new GSA.Decoder("GSA"));
        nmea.addParser(new VTG.Decoder("VTG"));
        nmea.addParser(new ROT.Decoder("ROT"));
        nmea.addParser(new RPM.Decoder("XDR"));
        nmea.addParser(new RTE.Decoder("RTE"));
        nmea.addParser(new MWD.Decoder("MWD"));
        nmea.addParser(new MWV.Decoder("MWV"));
        nmea.addParser(new DBT.Decoder("DBT"));
        nmea.addParser(new GLL.Decoder("GLL"));
        nmea.addParser(new HDG.Decoder("HDG"));
        nmea.addParser(new ZTG.Decoder("ZTG"));
        nmea.addParser(new VBW.Decoder("VBW"));
        nmea.addParser(new WPL.Decoder("WPL"));
        nmea.addParser(new ZDA.Decoder("ZDA"));
        nmea.addParser(new VHW.Decoder("VHW"));
        nmea.addParser(new VWR.Decoder("VWR"));
        nmea.addParser(new LAN.Decoder("LAN"));
        nmea.addParser(new LAR.Decoder("LAR"));
        nmea.addParser(new HTD.Decoder("HTD"));
        nmea.addParser(new RSA.Decoder("RSA"));

    // return the module object
    return nmea;
}());

module.exports = NMEA;
