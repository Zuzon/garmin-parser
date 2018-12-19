# garmin-parser [![npm version](https://badge.fury.io/js/garmin-parser.svg)](https://badge.fury.io/js/garmin-parser) [![Build Status](https://travis-ci.org/Zuzon/garmin-parser.svg?branch=master)](https://travis-ci.org/Zuzon/garmin-parser) [![Coverage Status](https://coveralls.io/repos/Zuzon/garmin-parser/badge.svg?branch=master)](https://coveralls.io/r/Zuzon/garmin-parser?branch=master)
Garmin USB binary protocol parser for nodejs / nwjs

## Install
```sh
npm install garmin-parser --save
```

## Features
Parser written by using of Garmin Device Interface Specification May 19, 2006 (It's a latest documentation which i found)

At this moment only session start and PVT data parsing is available. Tested on:

    Montana 650t
    Oregon 450
Another features and more detailed docs will come soon.

## How to use
Please look at example https://github.com/Zuzon/garmin-parser/tree/master/examples

### How to run an example
download repository and run this command
```sh
npm install
npm install usb
npm run example
```

### For windows users
* delete official garmin driver
* associate device to generic WinUsb driver by using Zadig or winusb-driver-generator https://www.npmjs.com/package/winusb-driver-generator
(personally i'm using a driver generator in my app, so user can instantly connect to garmin without any extra actions)


# API

    import { GarminParser } from 'garmin-parser'
    ...
    const garmin = new GarminParser()
    ...

## Methods

### garmin.startSession(): Promise<number>
returns device unit ID

    const deviceUnitId = await garmin.startSession();

starts session command to activate Application Layer Protocol. Must be called before all another commands

### garmin.requestProductData(): Promise<ProductData>
returns ProductData object and configures supported protocols of device, highly recommended to call after start session

### garmin.startPvt(): Promise<void>
start PVT translation

    garmin.on('pvtData', (data: PVTdataType) => {
        ...
    });
    garmin.startPvt();

### garmin.stopPvt(): Promise<void>
stop PVT data translation

## Events

## pvtData: Event
event starts coming approx 1 time per second after .startPvt()

    {
        raw: {                  // raw object as PVT data type
            alt: number;        // altitude above WGS 84 ellipsoid (meters)
            epe: number;        // estimated position error, 2 sigma (meters)
            eph: number;        // epe, but horizontal only (meters)
            eve: number;        // epe, but vertical only (meters)
            fix: number;        // type of position fix
            tow: number;        // time of week (seconds)
            posn: {
                lat: number;    // latitude in radians
                lon: number;    // longitude in radians
            };
            east: number;       // velocity east (meters/second)
            north: number;      // velocity north (meters/second)
            up: number;         // velocity up (meters/second)
            msl_hght: number;   // height of WGS84 ellipsoid above MSL(meters)
            leap_scnds: number; // difference between GPS and UTC (seconds)
            wn_days: number;    // week number days
        };
        parsed: {               // more javascript and human friendly data
            lat: number;        // latitutde in degrees
            lon: number;        // longitude in degrees
            altitude: number;   // altitude in meters
            dateUTC: Date;      // GPS datetime in UTC
            speedKmh: number;   // speed km/h
            fix: string;        // GPS fix type
        }
    }