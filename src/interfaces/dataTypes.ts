export interface PVTdataType {
    /* altitude above WGS 84 ellipsoid (meters) */
    alt: number;
    /* estimated position error, 2 sigma (meters) */
    epe: number;
    /* epe, but horizontal only (meters) */
    eph: number;
    /* epe, but vertical only (meters) */
    eve: number;
    /* type of position fix */
    fix: number;
    /* time of week (seconds) */
    tow: number;
    /* latitude and longitude (radians) */
    posn: RadianPositionType;
    /* velocity east (meters/second) */
    east: number;
    /* velocity north (meters/second) */
    north: number;
    /* velocity up (meters/second) */
    up: number;
    /* height of WGS84 ellipsoid above MSL(meters)*/
    msl_hght: number;
    /* difference between GPS and UTC (seconds) */
    leap_scnds: number;
    /* week number days */
    wn_days: number;
}

export interface RadianPositionType {
    lat: number;
    lon: number;
}
