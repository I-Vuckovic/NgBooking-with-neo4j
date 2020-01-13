import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Reservation } from 'src/app/models/reservation.model';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { ReservationCodeComponent } from '../reservation-code/reservation-code.component';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class PaymentComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private extraLuggage: boolean;
  private carbonFootprint: boolean;
  private reservation: Reservation;
  private trip: Trip;
  private tripSubscription: Subscription;
  private reservationSubscription: Subscription;
  private processing: boolean;
  private processed: boolean;

  constructor(private store: Store<fromStore.AppState>, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private action: Actions, public dialog: MatDialog) { }

  ngOnInit() {
    this.reservation = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    };
    const id : number = Number(this.route.snapshot.paramMap.get('tripId'));

    this.store.dispatch(new fromStore.FetchTripById(id))


    this.tripSubscription = this.store.select(fromStore.selectTripState).subscribe( res => {
      this.trip = res.selectedTrip;
    }
    )


    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({

    });
  }

  ngOnDestroy(): void {
    this.tripSubscription.unsubscribe();
  }
 
  makeReservation() {
    const finalPrice = this.trip.price +
      (this.extraLuggage ? this.trip.extraLuggage : 0) +
      (this.carbonFootprint ? 0.5 : 0);
    this.reservation.tripId = Number(this.trip.id);
    this.reservation.finalPrice = finalPrice;
    this.store.dispatch(new fromStore.ReserveSeat(this.reservation, this.trip.freeSeats - 1));
  }

}
