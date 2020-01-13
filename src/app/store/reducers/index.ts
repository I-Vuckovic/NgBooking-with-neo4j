import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTrips from './trip.reducer';
import * as fromFilter from './filter.reducer';
import * as fromReservation from './reservation.reducer';
import { Trip } from 'src/app/models/trip.model';

export interface AppState {
  trips: fromTrips.TripState;
  filter: fromFilter.FilterState;
  reservation: fromReservation.ReservationState;
}

export const reducers: ActionReducerMap<AppState> = {
  trips: fromTrips.tripReducer,
  filter: fromFilter.filterReducer,
  reservation: fromReservation.reservationReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTripState = createFeatureSelector<AppState, fromTrips.TripState>('trips');
export const getTripsLoading = createSelector(selectTripState, fromTrips.getTripsLoading);
export const getTripsLoaded = createSelector(selectTripState, fromTrips.getTripsLoaded);
export const getAllDestinations = createSelector(selectTripState, fromTrips.getAllDestinations);
export const getFromDestinations = createSelector(selectTripState, fromTrips.getFromDestinations);
export const getToDestinations = createSelector(selectTripState, fromTrips.getToDestinations);
export const getAllTrips = createSelector(selectTripState, fromTrips.getAllTrips);
export const getSelectedTrip = createSelector(selectTripState, fromTrips.getSelectedTrip);

export const selectReservationState = createFeatureSelector<AppState, fromReservation.ReservationState>('reservation');

export const selectFilterState = createFeatureSelector<AppState, fromFilter.FilterState>('filter');
export const getFromFilter = createSelector(selectFilterState, fromFilter.getFromDestination);
export const getToFilter = createSelector(selectFilterState, fromFilter.getToDestination);
export const getStartDateFilter = createSelector(selectFilterState, fromFilter.getStartDate);
export const getEndDateFilter = createSelector(selectFilterState, fromFilter.getEndDate);


