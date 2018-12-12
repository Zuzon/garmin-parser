import 'jasmine';
import { GarminParser } from '../';

describe('should create parser instance', () => {
    const parser = new GarminParser();
    it('should start session', async () => {
        parser.setOutEndpoint({ transfer: () => {
            const packet = Buffer.alloc(16);
            packet.writeUInt16LE(6, 4);
            packet.writeUInt32LE(4, 8);
            packet.writeUInt32LE(12345, 12);
            parser.inEndpoint(packet);
        }});
        expect(await parser.startSession()).toBe(12345);
    });
});
