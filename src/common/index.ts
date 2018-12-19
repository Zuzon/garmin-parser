export class Converter {
    public static getDate(wnDays: number, tow: number): Date {
        let time = 631065600000; // 1989 decemder 31
        time += wnDays * 24 * 60 * 60 * 1000; // add days
        time += tow * 1000; // add time
        return new Date(time);
    }

    public static getSpeed(north: number, east: number, up: number) {
        return (Math.abs(north) + Math.abs(east) + Math.abs(up)) * 3.6;
    }

    public static fixToString(fix: number): string {
        switch (fix) {
            case 1:
                return 'invalid';
            case 2:
                return '2D';
            case 3:
                return '3D';
            case 4:
                return '2D_diff';
            case 5:
                return '3D_diff';
            default:
                return 'unusable';
        }
    }
}
