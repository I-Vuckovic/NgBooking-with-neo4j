import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { Trip } from 'src/app/models/trip.model';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.component.html',
  styleUrls: ['./reservation-info.component.scss']
})
export class ReservationInfoComponent implements OnInit, OnDestroy {

  @Input() public reservation: Reservation;
  private trip: Trip;
  private tripSubscription: Subscription;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.tripSubscription = this.store.select(fromStore.selectTripState).subscribe( res => {
      this.trip = res.reservedTrip;
    })

  }

  ngOnDestroy(): void {
    this.tripSubscription.unsubscribe();
  }


}
