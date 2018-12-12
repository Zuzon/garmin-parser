# garmin-parser [![npm version](https://badge.fury.io/js/garmin-parser.svg)](https://badge.fury.io/js/garmin-parser) [![Build Status](https://travis-ci.org/Zuzon/garmin-parser.svg?branch=master)](https://travis-ci.org/Zuzon/garmin-parser)
Garmin USB binary protocol parser for nodejs / nwjs

## Install
```sh
npm install garmin-parser --save
```

## Features
Parser written by using of Garmin Device Interface Specification May 19, 2006 (It's a latest documentation which i found)

At this moment only session start and PVT data parsing is available. Tested on Garmin Montana 650t.
Another features will come soon.

## How to use
Please look at example https://github.com/Zuzon/garmin-parser/tree/master/examples

### How to run an example
download repository and run this command
```sh
npm install
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