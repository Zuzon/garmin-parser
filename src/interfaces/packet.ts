export interface Packet {
    packetType: number;
    packetId: number;
    dataSize: number;
    data: Buffer;
}
