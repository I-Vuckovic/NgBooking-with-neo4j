import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Trip } from 'src/app/models/trip.model';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = ['From', 'To', 'Time', 'Distance', 'Duration', 'Price', 'FreeSeats', 'Reserve'];

  private tripsSubscription: Subscription;
  private trips: Observable<Trip[]>;
  private filterSubscription: Subscription;
  private fromDestination: string;
  private toDestination: string;
  private startDate: Date;
  private endDate: Date;

  constructor(private store: Store<fromStore.AppState>, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.filterSubscription = this.store.select(fromStore.selectFilterState).subscribe(res => {
      this.fromDestination = res.from;
      this.toDestination = res.to
      this.startDate = res.startDate;
      this.endDate = res.endDate
    })


    this.store.dispatch(new fromStore.FetchTrips(this.fromDestination, this.toDestination, this.startDate, this.endDate));

    this.trips = this.store.select(fromStore.getAllTrips);

  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }


}
