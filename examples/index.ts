import * as usb from 'usb';
import { GarminParser } from '../dist';

const garminDevice: usb.Device = usb.findByIds(2334, 3);
console.log('try to find connected device', garminDevice);
if (garminDevice !== undefined) {
    startListen(garminDevice);
}

usb.on('attach', (device) => {
    startListen(device);
});

async function startListen(device: usb.Device) {
    const garmin = new GarminParser();

    // subscribe for data events
    garmin.on('pvtData', (data) => {
        console.log('pvt', data);
    });

    garmin.on('satData', (data) => {
        console.log('sat', data);
    });

    device.open(true);
    const inf = device.interfaces[0];
    inf.claim();

    // attach usb endpoints to parser and start poll for data
    for (const endpoint of inf.endpoints) {
        if (endpoint.direction === 'in') {
            endpoint.on('data', (buffer: Buffer) => {
                if (buffer.length < 12) { return; }
                garmin.inEndpoint(buffer).then();
            });
            (endpoint as usb.InEndpoint).startPoll();
        }
        if (endpoint.direction === 'out') {
            garmin.setOutEndpoint(endpoint);
        }
        endpoint.on('error', function(err) {
            console.error('endpoint err', err);
        });
        endpoint.on('end', function(err) {
            console.error('endpoint end', err);
        });
    }

    const deviceUnitId = await garmin.startSession(); // start session
    console.info('Session started', deviceUnitId);
    console.info('Device info', await garmin.requestProductData());

    await garmin.startPvt();
}
