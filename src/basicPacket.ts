import { Protocol } from './interfaces/protocol';
import { PacketType } from './enums/pids/packetType';
import { ProductData } from './interfaces/productData';
export class BasicPacket {
    public static parseProtocolArray(buffer: Buffer): Protocol[] {
        const result: Protocol[] = [];
        for (let i = 0; i < buffer.length; i += 3) {
            result.push({
                tag: buffer.slice(i, i + 1).toString('ascii'),
                data: buffer.readUInt16LE(i + 1)
            });
        }
        return result;
    }

    public static parseProductData(buffer: Buffer): ProductData {
        return {
            productId: buffer.readUInt16LE(0),
            softwareVersion: buffer.readInt16LE(2) / 100,
            productName: buffer.slice(4).toString()
        };
    }

    public static getBasicPacket(
        packetType: PacketType.ApplicationLayer | PacketType.ProtocolLayer,
        pid: number,
        data?: Buffer): Buffer {
        const result = Buffer.alloc(12);
        result.writeUInt8(packetType, 0);
        result.writeUInt16LE(pid, 4);
        if (data) {
            result.writeUInt32LE(data.length, 8);
            return Buffer.concat([result, data]);
        }
        return result;
    }
}
