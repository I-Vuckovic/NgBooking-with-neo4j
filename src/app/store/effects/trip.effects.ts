import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';

import * as tripActions from '../actions/trip.actions';
import * as fromServices from '../../services';
import * as reservationActions from '../actions/reservation.actions';
import { Trip } from 'src/app/models/trip.model';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ReservationCodeComponent } from 'src/app/components/reservation-code/reservation-code.component';
import { ReservationService } from 'src/app/services/reservation.service';


@Injectable()
export class TripEffects {
    constructor(private actions$: Actions,
        private tripService: fromServices.TripService,
        public dialog: MatDialog,
        private reservationService: ReservationService
    ) { }

    extractDestinations(res :any ){
        let destinations = [];
        res.map(trip => destinations = [trip[0].properties.name, ...destinations])
        return destinations;
    }

    extractTrips(trips : any) {
        let finalTrips : Trip [] = [];
        
         trips.map(trip => finalTrips = [ this.extractSingleTrip(trip) ,...finalTrips])
        return finalTrips;
    }
    
    extractSingleTrip  (trip :any): Trip {
        return {id: trip[0].id.low, duration: trip[0].duration, distance: trip[0].distance.low,
            price: trip[0].price.low, freeSeats: trip[0].freeSeats.low, from:trip[0].from,
            to: trip[0].to, time: trip[0].time, extraLuggage: trip[0].extraLuggage.low }
    }

    @Effect()
    addTrip$ = this.actions$.pipe(
        ofType(tripActions.ADD_TRIP),
        switchMap((action : tripActions.AddTrip) => 
            this.tripService.addTrip(action.trip).then(() => new tripActions.AddTripSucess)
        )
        
    )

    @Effect()
    loadFromDestinations$ = this.actions$.pipe(
        ofType(tripActions.FETCH_FROM_DESTINATIONS),
        switchMap((action : tripActions.FetchFromDestinations) => 
            this.tripService.getFromDestinations(action.toDestination).then( destinations => {
                
                return this.extractDestinations(destinations);

             
            }
            )
            .then( res => new tripActions.FromDestinationsRecieved(res))
        )
    )

    @Effect()
    loadToDestinations$ = this.actions$.pipe(
        ofType(tripActions.FETCH_TO_DESTINATIONS),
        switchMap((action : tripActions.FetchToDestinations) => 
            this.tripService.getToDestinations(action.fromDestination).then( destinations => {
                
                return this.extractDestinations(destinations);

             
            }
            )
            .then( res => new tripActions.ToDestinationsRecieved(res))
        )
    )

    @Effect()
    loadDestinations$ = this.actions$.pipe(
        ofType(tripActions.FETCH_ALL_DESTINATIONS),
        switchMap(() => this.tripService.getAllDestinations().then( trips => {
        
            return this.extractDestinations(trips);
        })
        .then( res => new tripActions.DestinationsRecieved(res))
           
    ))

    @Effect()
    loadTrips$ = this.actions$.pipe(
        ofType(tripActions.FETCH_TRIPS),
        switchMap((action : tripActions.FetchTrips) => 
            {
                return this.tripService
                .getTrips(action.fromDestionation, action.toDestination, action.startDate, action.endDate)
                .then( res => { 
                    return new tripActions.FetchTripsSucess(this.extractTrips(res))})}
        )
    )

    @Effect()
    loadTripById$ = this.actions$.pipe(
        ofType(tripActions.FETCH_TRIP_BY_ID),
        switchMap((action : tripActions.FetchTripById)=> 
            this.tripService.getTripById(action.id).then(res => { 
                return new tripActions.TripByIdRecieved(this.extractSingleTrip(res[0]))})
        )
    )

    @Effect()
    reservationMade$ = this.actions$.pipe(
        ofType(reservationActions.RESERVATION_MADE),
        switchMap((action : reservationActions.ReservationMade) => 
            this.tripService.updateFreeSeats(action.tripId).then(() => {
                
                return new reservationActions.ReserveSeatSucess(action.reservationId)
        })
        .catch(() => new reservationActions.ReserveSeatFail())
        
    ))

    @Effect({dispatch: false})
    reserveSeatSuccess$ = this.actions$.pipe(
        ofType(reservationActions.RESERVE_SEAT_SUCESS),
        map((action : reservationActions.ReserveSeatSucess)=> 
                {this.dialog.open(ReservationCodeComponent, {data: action.reservationId})}  )
    )

    @Effect()
    loadReservedTrip = this.actions$.pipe(
        ofType(tripActions.FETCH_RESERVED_TRIP),
        switchMap((action: tripActions.FetchReservedTrip) => 
            this.tripService.getTripById(action.reservation.tripId).then( res => {
                const trip = this.extractSingleTrip(res[0]);

                return new reservationActions.FetchReservationSucess(action.reservation, trip);
            }))
            
    )

    @Effect({dispatch: false})
    addNewDestination$ = this.actions$.pipe(
        ofType(tripActions.ADD_NEW_DESTINATION),
        map((action : tripActions.AddNewDestination) => this.tripService.addNewDestination(action.newDestination))
    )
}