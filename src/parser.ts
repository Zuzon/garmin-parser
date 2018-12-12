import { EventEmitter } from 'events';
import { Protocol, Packet, ProductData } from './interfaces';
import {
    ProtocolLayerPid,
    PacketType,
    BasicPid,
    Tag,
    L001,
    L002,
    A010
} from './enums';
import { BasicPacket } from './basicPacket';
import { LinkProtocolParser } from './protocols/link';
/**
 * Main parsing class
 *
 * @export
 * @class GarminParser
 */
export class GarminParser {

    /**
     *
     *
     * @type {Protocol[]}
     * @memberof GarminParser
     */
    public protocols: Protocol[];
    private _eventEmitter: EventEmitter;
    private _protocolConfigured: boolean = false;
    private _outEndpoint: any;
    private sessionStarted: boolean = false;
    private linkProtocolVersion: number = 1;
    private timeout: number = 3000;
    constructor() {
        this._eventEmitter = new EventEmitter();
        this.protocols = [];
    }
    /**
     * Use this method as callback for node-usb in-endpoint transfer
     *
     * @param {Buffer} buffer
     * @returns {Promise<void>}
     * @memberof GarminParser
     */
    public async inEndpoint(buffer: Buffer): Promise<void> {
        const packet = this.getPacket(buffer);
        switch (packet.packetType) {
            case PacketType.ProtocolLayer:
                await this.processProtocolLayer(packet);
                return;
            case PacketType.ApplicationLayer:
                await this.processApplicationLayer(packet);
                return;
            default:
                return;
        }
    }

    /**
     * Pass out-endpoint here, to send packets via GarminParser
     *
     * @param {*} endpoint
     * @memberof GarminParser
     */
    public setOutEndpoint(endpoint: any): void {
        this._outEndpoint = endpoint;
    }

    /**
     * Subscribe for event
     *
     * @param {string} eventName
     * @param {(...args: any[]) => void} fn
     * @returns
     * @memberof GarminParser
     */
    public on(eventName: string, fn: (...args: any[]) => void) {
        return this._eventEmitter.on(eventName, fn);
    }

    /**
     * Start data translation session, must be called before call any another commands.
     * While session not started, parser will ignore all incoming packets
     *
     * @returns {Promise<number>}
     * @memberof GarminParser
     */
    public async startSession(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject('start session TIMEOUT');
            }, this.timeout);
            this._eventEmitter.once('sessionStarted', (unitId: number) => {
                clearTimeout(timeout);
                resolve(unitId);
            });
            const packet = BasicPacket.getBasicPacket(
                PacketType.ProtocolLayer,
                ProtocolLayerPid.Pid_Start_Session);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    clearTimeout(timeout);
                    reject(err);
                    this._eventEmitter.off('sessionStarted', resolve);
                    return;
                }
            });
        });
    }

    /**
     * Send request command for product data, such as name, device ID, supported protocols...
     *
     * @returns {Promise<ProductData>}
     * @memberof GarminParser
     */
    public async requestProductData(): Promise<ProductData> {
        return new Promise<ProductData>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject('request product data TIMEOUT');
            }, this.timeout);
            const handler = (data: ProductData) => {
                clearTimeout(timeout);
                resolve(data);
            };
            this._eventEmitter.once('productData', handler);
            const packet = BasicPacket.getBasicPacket(
                PacketType.ApplicationLayer,
                BasicPid.Pid_Product_Rqst);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    clearTimeout(timeout);
                    reject(err);
                    this._eventEmitter.off('productData', handler);
                    return;
                }
            });
        });
    }

    /**
     * Start PVT data translation. To handle incoming PVT - subscribe for 'pvtData' event
     *
     * @returns {Promise<void>}
     * @memberof GarminParser
     */
    public async startPvt(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.isSupported('A', 10) && this.linkProtocolVersion !== 1) {
                reject('PVT not supported by this device');
                return;
            }
            const timeout = setTimeout(() => {
                reject('start PVT TIMEOUT');
            }, this.timeout);
            const handler = () => {
                clearTimeout(timeout);
                resolve();
            };
            this._eventEmitter.once('pvtData', handler);
            const commandData = Buffer.alloc(2);
            commandData.writeUInt16LE(A010.Cmnd_Start_Pvt_Data, 0);
            const packet = BasicPacket.getBasicPacket(
                PacketType.ApplicationLayer,
                L001.Pid_Command_Data,
                commandData
                );
            console.log('start pvt packet', packet);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    clearTimeout(timeout);
                    reject(err);
                    this._eventEmitter.off('pvtData', handler);
                    return;
                }
            });
        });
    }

    /**
     * Stop PVT data translation
     *
     * @returns {Promise<void>}
     * @memberof GarminParser
     */
    public async stopPvt(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.isSupported('A', 10) && this.linkProtocolVersion !== 1) {
                reject('PVT not supported by this device');
                return;
            }
            const commandData = Buffer.alloc(2);
            commandData.writeUInt16LE(A010.Cmnd_Stop_Pvt_Data, 0);
            const packet = BasicPacket.getBasicPacket(
                PacketType.ApplicationLayer,
                L001.Pid_Command_Data,
                commandData
                );
            console.log('stop pvt packet', packet);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    /**
     *
     *
     * @returns {Promise<void>}
     * @memberof GarminParser
     */
    public async startTransferWpt(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // if (!this.isSupported('A', 10) && this.linkProtocolVersion !== 1) {
            //     reject('PVT not supported by this device');
            //     return;
            // }
            const commandData = Buffer.alloc(2);
            commandData.writeUInt16LE(A010.Cmnd_Transfer_Wpt, 0);
            const packet = BasicPacket.getBasicPacket(
                PacketType.ApplicationLayer,
                L001.Pid_Command_Data,
                commandData
                );
            console.log('start wpt transfer', packet);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    /**
     * Abort transfer process
     *
     * @returns {Promise<void>}
     * @memberof GarminParser
     */
    public async stopTransfer(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // if (!this.isSupported('A', 10) && this.linkProtocolVersion !== 1) {
            //     reject('PVT not supported by this device');
            //     return;
            // }
            const commandData = Buffer.alloc(2);
            commandData.writeUInt16LE(A010.Cmnd_Abort_Transfer, 0);
            const packet = BasicPacket.getBasicPacket(
                PacketType.ApplicationLayer,
                L001.Pid_Command_Data,
                commandData
                );
            console.log('stop transfer', packet);
            this._outEndpoint.transfer(packet, (err: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    // public async powerOff(): Promise<void> {
    //     return new Promise<void>((resolve, reject) => {
    //         if (!this.isSupported('A', 10) && this.linkProtocolVersion !== 1) {
    //             reject('Power off not supported by this device');
    //             return;
    //         }
    //         const commandData = Buffer.alloc(2);
    //         commandData.writeUInt16LE(A010.Cmnd_Turn_Off_Pwr, 0);
    //         const packet = BasicPacket.getBasicPacket(
    //             PacketType.ApplicationLayer,
    //             L001.Pid_Command_Data,
    //             commandData
    //             );
    //         console.log('power off packet', packet);
    //         this._outEndpoint.transfer(packet, (err: any) => {
    //             if (err) {
    //                 reject(err);
    //                 this._eventEmitter.off('pvtData', resolve);
    //                 return;
    //             }
    //             resolve();
    //         });
    //     });
    // }

    private async processProtocolLayer(packet: Packet): Promise<void> {
        switch (packet.packetId) {
            case ProtocolLayerPid.Pid_Data_Available:
                this._eventEmitter.emit('dataAvailable');
                return;
            case ProtocolLayerPid.Pid_Session_Started:
                this.sessionStarted = true;
                this._eventEmitter.emit('sessionStarted', packet.data.readUInt32LE(0));
                return;
            default:
                return;
        }
    }

    private processApplicationLayer(packet: Packet): void {
        if (packet.packetId === BasicPid.Pid_Protocol_Array) {
            this.protocols = BasicPacket.parseProtocolArray(packet.data);
            for (const protocol of this.protocols) {
                if (protocol.tag === Tag.Tag_Link_Prot_Id) {
                    this.linkProtocolVersion = protocol.data;
                    break;
                }
            }
            console.log('device is configured', this.protocols);
            this._protocolConfigured = true;
            return;
        }
        switch (packet.packetId) {
            case BasicPid.Pid_Product_Data:
                this._eventEmitter.emit('productData', BasicPacket.parseProductData(packet.data));
                return;
            case BasicPid.Pid_Ext_Product_Data:
                this._eventEmitter.emit('ExtProductData', packet.data.toString());
                return;
            default:
                break;
        }
        if (!this.sessionStarted) {
            console.warn('ignore packet', packet);
            return;
        }
        if (packet.packetId === 114) {
            const result: any[] = [];
            for (let i = 0; i < packet.dataSize; i += 7) {
                result.push({
                    nsat: packet.data.readUInt8(i),
                    signal: packet.data.readInt16LE(i + 1),
                    elev: packet.data.readUInt8(i + 3),
                    azimuth: packet.data.readUInt16LE(i + 4)
                });
            }
            this._eventEmitter.emit('satData', result);
            return;
        }
        if (this.linkProtocolVersion === 1) {
            LinkProtocolParser.parseL001(packet, this._eventEmitter);
            return;
        }
        if (this.linkProtocolVersion === 2) {
            LinkProtocolParser.parseL002(packet, this._eventEmitter);
            return;
        }
    }

    private getPacket(buffer: Buffer): Packet {
        const result: Packet = {
            packetType: buffer.readUInt8(0),
            packetId: buffer.readUInt16LE(4),
            dataSize: buffer.readUInt32LE(8),
            data: Buffer.alloc(0)
        };
        if (buffer.length > 12) {
            result.data = buffer.slice(12);
        }
        return result;
    }

    private isSupported(tag: string, protocol: number) {
        for (const p of this.protocols) {
            if (p.tag === tag && protocol === p.data) {
                return true;
            }
        }
        return false;
    }
}
