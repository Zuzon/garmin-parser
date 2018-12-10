import { EventEmitter } from 'events';
import { Packet, PVTdataType } from '../interfaces';
import { L001, L002 } from '../enums/pids/link';
export class LinkProtocolParser {
    public static parseL001(packet: Packet, emitter: EventEmitter): void {
        // console.log('parse L001', packet);
        switch (packet.packetId) {
            case L001.Pid_Almanac_Data:
                console.log('almanac data', packet.data);
                // not implemented
                break;
            case L001.Pid_Command_Data:
                console.log('command data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course:
                console.log('course data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course_Lap:
                console.log('course lap data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course_Limits:
                console.log('course lap data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course_Point:
                console.log('course point data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course_Trk_Data:
                console.log('course trk data', packet.data);
                // not implemented
                break;
            case L001.Pid_Course_Trk_Hdr:
                console.log('course trk hdr data', packet.data);
                // not implemented
                break;
            case L001.Pid_Date_Time_Data:
                console.log('date time data', packet.data);
                // not implemented
                break;
            case L001.Pid_Fitness_User_Profile:
                console.log('fitness user profile data', packet.data);
                // not implemented
                break;
            case L001.Pid_FlightBook_Record:
                console.log('flightbook data', packet.data);
                // not implemented
                break;
            case L001.Pid_Lap:
                console.log('lap data', packet.data);
                // not implemented
                break;
            case L001.Pid_Position_Data:
                console.log('position data', packet.data);
                // not implemented
                break;
            case L001.Pid_Prx_Wpt_Data:
                console.log('prx wpt data', packet.data);
                // not implemented
                break;
            case L001.Pid_Pvt_Data:
                const result: PVTdataType = {
                    alt: packet.data.readFloatLE(0),
                    epe: packet.data.readFloatLE(4),
                    eph: packet.data.readFloatLE(8),
                    eve: packet.data.readFloatLE(12),
                    fix: packet.data.readUInt16LE(16),
                    tow: packet.data.readDoubleLE(18),
                    posn: {
                        lat: packet.data.readDoubleLE(26),
                        lon: packet.data.readDoubleLE(34)
                    },
                    east: packet.data.readFloatLE(42),
                    north: packet.data.readFloatLE(46),
                    up: packet.data.readFloatLE(50),
                    msl_hght: packet.data.readFloatLE(54),
                    leap_scnds: packet.data.readInt16LE(58),
                    wn_days: packet.data.readUInt32LE(60)
                };
                emitter.emit('pvtData', result);
                break;
            case L001.Pid_Records:
                console.log('records data', packet.data);
                // not implemented
                break;
            case L001.Pid_Rte_Hdr:
                console.log('rte hdr data', packet.data);
                // not implemented
                break;
            case L001.Pid_Rte_Link_Data:
                console.log('rte link data', packet.data);
                // not implemented
                break;
            case L001.Pid_Rte_Wpt_Data:
                console.log('rte wpt data', packet.data);
                // not implemented
                break;
            case L001.Pid_Run:
                console.log('run data', packet.data);
                // not implemented
                break;
            case L001.Pid_Trk_Data:
                console.log('trk data', packet.data);
                // not implemented
                break;
            case L001.Pid_Trk_Hdr:
                console.log('trk hdr data', packet.data);
                // not implemented
                break;
            case L001.Pid_Workout:
                console.log('workout data', packet.data);
                // not implemented
                break;
            case L001.Pid_Workout_Limits:
                console.log('workout limits data', packet.data);
                // not implemented
                break;
            case L001.Pid_Workout_Occurrence:
                console.log('workout occurrence data', packet.data);
                // not implemented
                break;
            case L001.Pid_Wpt_Cat:
                console.log('wpt category data', packet.data);
                // not implemented
                break;
            case L001.Pid_Wpt_Data:
                console.log('wpt data', packet.data);
                // not implemented
                break;
            case L001.Pid_Xfer_Cmplt:
                console.log('xfer cmplt', packet.data);
                // not implemented
                break;
            default:
                console.log('unknown packet', packet);
                return;
        }
    }

    public static parseL002(packet: Packet, emitter: EventEmitter): void {
        switch (packet.packetId) {
            case L002.Pid_Almanac_Data:
                console.log('L002: almanac data', packet.data);
                // not implemented
                break;
            case L002.Pid_Command_Data:
                console.log('L002: command data', packet.data);
                // not implemented
                break;
            case L002.Pid_Date_Time_Data:
                console.log('L002: date time data', packet.data);
                // not implemented
                break;
            case L002.Pid_Position_Data:
                console.log('L002: position data', packet.data);
                // not implemented
                break;
            case L002.Pid_Prx_Wpt_Data:
                console.log('L002: prx wpt data', packet.data);
                // not implemented
                break;
            case L002.Pid_Records:
                console.log('L002: records', packet.data);
                // not implemented
                break;
            case L002.Pid_Rte_Hdr:
                console.log('L002: rte hdr', packet.data);
                // not implemented
                break;
            case L002.Pid_Rte_Wpt_Data:
                console.log('L002: rte wpt data', packet.data);
                // not implemented
                break;
            case L002.Pid_Wpt_Data:
                console.log('L002: wpt data', packet.data);
                // not implemented
                break;
            case L002.Pid_Xfer_Cmplt:
                console.log('L002: xfer cmplt', packet.data);
                // not implemented
                break;
        }
    }
}
