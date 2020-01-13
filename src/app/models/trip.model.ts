export interface Trip {
    id?: string;
    from: string;
    to: string;
    time: Date;
    timestamp?: any;
    distance: number;
    price: number;
    duration: string;
    freeSeats: number;
    extraLuggage: number;
}

