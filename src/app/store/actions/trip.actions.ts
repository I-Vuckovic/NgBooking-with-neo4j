import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';
import { Reservation } from 'src/app/models/reservation.model';

export const FETCH_TRIPS = '[TRIP] Fetch trips';
export const FETCH_TRIPS_FAIL = '[TRIP] Fetch trips failed';
export const FETCH_TRIPS_SUCCESS = '[TRIP] Fetch trips sucess';
export const FETCH_TRIP_BY_ID = '[TRIP] Fetch trip by id';
export const TRIP_BY_ID_RECIEVED = '[TRIP] Trip by id recieved';
/// MOZDA NE TREBAJU
export const FETCH_RESERVED_TRIP = '[TRIP] Fetch reserved trip';
export const RESERVED_TRIP_RECIEVED = '[TRIP] Reserved trip recieved'
///
export const UPDATE_FREE_SEATS = '[TRIP] Update free seats'
export const FETCH_ALL_DESTINATIONS = '[TRIP] Fetch all destinations'
export const DESTINATIONS_RECIEVED = '[TRIP] Destinations recieved'
export const FETCH_FROM_DESTINATIONS = '[TRIP] Fetch from destinations'
export const FROM_DESTINATIONS_RECIEVED = '[TRIP] From destinations recieved'
export const FETCH_TO_DESTINATIONS = '[TRIP] Fetch to destinations'
export const TO_DESTINATIONS_RECIEVED = '[TRIP] To destinations recieved'
export const ADD_TRIP = '[TRIP] Add new trip'
export const ADD_TRIP_SUCCESS = '[TRIP] Add new trip sucess'

export class FetchTrips implements Action{
    readonly type = FETCH_TRIPS;
    constructor(public fromDestination: string, public toDestination: string) {}
}

export class FetchTripsFail implements Action{
    readonly type = FETCH_TRIPS_FAIL;
    constructor(public payload: any){}
}

export class FetchTripsSucess implements Action{
    readonly type = FETCH_TRIPS_SUCCESS;
    constructor(public payload: Trip[]){}
}

export class FetchTripById implements Action {
    readonly type = FETCH_TRIP_BY_ID;
    constructor(public id : number) {}
}

export class TripByIdRecieved implements Action {
    readonly type = TRIP_BY_ID_RECIEVED;
    constructor(public trip :Trip) {}
}

export class FetchReservedTrip implements Action {
    readonly type = FETCH_RESERVED_TRIP;
    constructor(public reservation: Reservation) {}
}

export class ReservedTripRecieved implements Action {
    readonly type = RESERVED_TRIP_RECIEVED;
    constructor(public trip: Trip) {}
}

export class UpdateFreeSeats implements Action{
    readonly type = UPDATE_FREE_SEATS;
    constructor(public tripId: number, public freeSeats: number){}
}

export class FetchAllDestinations implements Action {
    readonly type = FETCH_ALL_DESTINATIONS;
}

export class DestinationsRecieved implements Action {
    readonly type = DESTINATIONS_RECIEVED;
    constructor(public destinations: string[]){}
}

export class FetchToDestinations implements Action {
    readonly type = FETCH_TO_DESTINATIONS;
    constructor(public fromDestination: string) {}
}

export class ToDestinationsRecieved implements Action {
    readonly type = TO_DESTINATIONS_RECIEVED;
    constructor(public destinations: string[]) {}
}

export class FetchFromDestinations implements Action{
    readonly type = FETCH_FROM_DESTINATIONS;
    constructor(public toDestination: string) {}
}

export class FromDestinationsRecieved implements Action {
    readonly type = FROM_DESTINATIONS_RECIEVED;
    constructor(public destinations: string[]) {}
}

export class AddTrip implements Action {
    readonly type = ADD_TRIP;
    constructor(public trip: Trip) {}
}

export class AddTripSucess implements Action {
    readonly type = ADD_TRIP_SUCCESS;
    
}

export type TripActions = FetchTrips | FetchTripsFail | FetchTripsSucess | UpdateFreeSeats | FetchAllDestinations 
                            | DestinationsRecieved 
                            | AddTrip
                            | AddTripSucess
                            | FetchToDestinations
                            | ToDestinationsRecieved
                            | FetchFromDestinations
                            | FromDestinationsRecieved
                            | FetchTripById
                            | TripByIdRecieved
                            | FetchReservedTrip
                            | ReservedTripRecieved;
