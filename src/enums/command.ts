export enum A010 {
    /**
     * abort current transfer
     */
    Cmnd_Abort_Transfer = 0,
    /**
     * transfer almanac
     */
    Cmnd_Transfer_Alm = 1,
    /**
     * transfer position
     */
    Cmnd_Transfer_Posn = 2,
    /**
     * transfer proximity waypoints
     */
    Cmnd_Transfer_Prx = 3,
    /**
     * transfer routes
     */
    Cmnd_Transfer_Rte = 4,
    /**
     * transfer time
     */
    Cmnd_Transfer_Time = 5,
    /**
     * transfer track log
     */
    Cmnd_Transfer_Trk = 6,
    /**
     * transfer waypoints
     */
    Cmnd_Transfer_Wpt = 7,
    /**
     * turn off power
     */
    Cmnd_Turn_Off_Pwr = 8,
    /**
     * Request Unit ID
     * tested on Montana 650t
     */
    Cmnd_RequestUnitId = 14,
    Cmnd_Transfer_Undefined1 = 15,
    /**
     * start transmitting PVT data
     */
    Cmnd_Start_Pvt_Data = 49,
    /**
     * stop transmitting PVT data
     */
    Cmnd_Stop_Pvt_Data = 50,
    /**
     * transfer flight records
     */
    Cmnd_FlightBook_Transfer = 92,
    /**
     * transfer fitness laps
     */
    Cmnd_Transfer_Laps = 117,
    /**
     * transfer waypoint categories
     */
    Cmnd_Transfer_Wpt_Cats = 121,
    /**
     * transfer fitness runs
     */
    Cmnd_Transfer_Runs = 450,
    /**
     * transfer workouts
     */
    Cmnd_Transfer_Workouts = 451,
    /**
     * transfer workout occurrences
     */
    Cmnd_Transfer_Workout_Occurrences = 452,
    /**
     * transfer fitness user profile
     */
    Cmnd_Transfer_Fitness_User_Profile = 453,
    /**
     * transfer workout limits
     */
    Cmnd_Transfer_Workout_Limits = 454,
    /**
     * transfer fitness courses
     */
    Cmnd_Transfer_Courses = 561,
    /**
     * transfer fitness course laps
     */
    Cmnd_Transfer_Course_Laps = 562,
    /**
     * transfer fitness course points
     */
    Cmnd_Transfer_Course_Points = 563,
    /**
     * transfer fitness course tracks
     */
    Cmnd_Transfer_Course_Tracks = 564,
    /**
     * transfer fitness course limits
     */
    Cmnd_Transfer_Course_Limits = 565
}

export enum A011 {
    Cmnd_Abort_Transfer = 0, /* abort current transfer */
    Cmnd_Transfer_Alm = 4, /* transfer almanac */
    Cmnd_Transfer_Rte = 8, /* transfer routes */
    Cmnd_Transfer_Prx = 17, /* transfer proximity waypoints */
    Cmnd_Transfer_Time = 20, /* transfer time */
    Cmnd_Transfer_Wpt = 21, /* transfer waypoints */
    Cmnd_Turn_Off_Pwr = 26 /* turn off power */
}
