import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Trip } from 'src/app/models/trip.model';


@Component({
  selector: 'app-trip-input',
  templateUrl: './trip-input.component.html',
  styleUrls: ['./trip-input.component.scss']
})
export class TripInputComponent implements OnInit {
  private Destinations$: Observable<string[]>;
  private selectedFrom: string;
  private selectedTo: string;

  private trip: Trip;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {

    this.trip = {
      from: '',
      to: '',
      freeSeats: null,
      price: null,
      extraLuggage: null,
      distance: null,
      duration: '',
      time: new Date(0)
      
    }
  
    this.store.dispatch(new fromStore.FetchAllDestinations());

    this.Destinations$ = this.store.select(fromStore.getAllDestinations);
       
  }

  ngOnDestroy() {
    
  }

  addNewTrip(){
    this.store.dispatch(new fromStore.AddTrip(this.trip))
  }

}
