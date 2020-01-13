import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as Actions from '../actions';
import { Update } from '@ngrx/entity';
import { SafeMethodCall } from '@angular/compiler';



export interface TripState  {
    allDestinations: string[];
    allTrips: Trip[];
    toDestinations: string[];
    fromDestinations: string[];
    loaded: boolean;
    loading: boolean;
    selectedTrip: Trip;
    reservedTrip: Trip;
}
const initialState: TripState = {
    loaded: false,
    loading: false,
    allDestinations: [],
    allTrips: [],
    fromDestinations: [],
    toDestinations: [],
    selectedTrip: null,
    reservedTrip: null,
};

export function tripReducer(state: TripState = initialState, 
                            action: Actions.TripActions | Actions.ReservationActions): TripState {

    switch (action.type) {

        case Actions.DESTINATIONS_RECIEVED:
            return {
                ...state,
                allDestinations: action.destinations
            }

        case Actions.FETCH_TRIPS:
            return {
                ...state,
                loading: true,
            };

        case Actions.FROM_DESTINATIONS_RECIEVED:
            return {
                ...state,
                fromDestinations: action.destinations
            }

        case Actions.TO_DESTINATIONS_RECIEVED:
            return {
                ...state,
                toDestinations: action.destinations
            }

        case Actions.FETCH_TRIPS_SUCCESS:
            
            return {...state, allTrips: action.payload}

        case Actions.FETCH_TRIPS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
            };

        case Actions.TRIP_BY_ID_RECIEVED:
            return {
                ...state,
                selectedTrip: action.trip
            }

        case Actions.FETCH_RESERVATION_SUCESS: 
            return {
                ...state,
                reservedTrip: action.reservedTrip
            }

        case Actions.UPDATE_FREE_SEATS:
           return {...state}
        default:
            return state;
    }
}



export const getTripsLoading = (state: TripState) => state.loading;
export const getTripsLoaded = (state: TripState) => state.loaded;
export const getAllTrips = (state: TripState) => state.allTrips;
export const getAllDestinations = (state: TripState) => state.allDestinations;
export const getFromDestinations = (state: TripState) => state.fromDestinations;
export const getToDestinations = (state : TripState) => state.toDestinations;
export const getSelectedTrip = (state : TripState) => state.selectedTrip;
export const getReservedTrip = (state : TripState) => state.reservedTrip;

