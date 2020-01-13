import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.scss']
})
export class ReservationSearchComponent implements OnInit, OnDestroy {

  private fetchingReservation: boolean;
  private fetchingReservationFail: boolean;
  private fetchingReservationSucess: boolean;
  private reservation: Reservation;
  private reservationSubscription: Subscription;
  private reservationId: string;
  private idFormControl: FormControl;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.reservationId = '';

    this.reservationSubscription = this.store.select(fromStore.selectReservationState).subscribe(res => {
      this.fetchingReservation = res.fetchingReservation;
      this.fetchingReservationFail = res.fetchingReservationFail;
      this.fetchingReservationSucess = res.fetchingReservationSucess;
      this.reservation = res.reservation;
    })

    this.idFormControl = new FormControl('', [
      Validators.required,
    ]);
  }

  ngOnDestroy(): void {
    this.reservationSubscription.unsubscribe();
  }

  searchForReservaton() {
    if (this.reservationId === '') {
      this.idFormControl.setErrors(Validators.required);
    } else {
      this.store.dispatch(new fromStore.FetchReservation(Number(this.reservationId)));
    }
  }

}
