import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {Reservation} from '../../models/reservation.model';
import * as tripActions from '../actions/trip.actions';
import * as fromServices from '../../services';
import * as reservationActions from '../actions/reservation.actions';
import { ReservationCodeComponent } from 'src/app/components/reservation-code/reservation-code.component';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';

@Injectable()
export class ReservationEffects {
    constructor(private actions$: Actions, private reservationService: ReservationService, public dialog: MatDialog,
    ) { }

    @Effect()
    getReservation$ = this.actions$.pipe(
        ofType(reservationActions.FETCH_RESERVATION),
        switchMap((action: reservationActions.FetchReservation) => 
            this.reservationService.getReservation(action.payload).then(res => {
             
                if (res.length === 0) {
                    return new reservationActions.FetchReservationFail()
                }
                
                //Ovde se ne pristupa polju 'properties' jer servis ima malo drugaciji upit koji vraca malo drugaciji format
                const reservation : Reservation = {firstName: res[0][0].firstName,
                                                   lastName: res[0][0].lastName,
                                                   phoneNumber: res[0][0].phoneNumber,
                                                   email: res[0][0].email,
                                                   finalPrice: res[0][0].finalPrice.low,
                                                   tripId: res[0][0].tripId};

                return new tripActions.FetchReservedTrip(reservation);
            })
            .catch(() => new reservationActions.FetchReservationFail())
            )
    )

    @Effect()
    reserveSeat$ = this.actions$.pipe(
        ofType(reservationActions.RESERVE_SEAT),
        switchMap((action: reservationActions.ReserveSeat) =>
            this.reservationService.reserveSeat(action.payload)
                .then(res => {
                    const tripId = res[0][0].tripId.low;
                    const reservationId = res[0][0].reservationId.low;

                    return new reservationActions.ReservationMade(tripId, reservationId);
                })
                .catch(() => new reservationActions.ReserveSeatFail())
        ),
    )
}

