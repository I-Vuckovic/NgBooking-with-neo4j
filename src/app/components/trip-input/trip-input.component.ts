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
  private error: boolean;
  private errorText: string;
  private trip: Trip;
  private newDestination: string;
  private selectedDate: Date;


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
      time: new Date() 
    }

    this.newDestination = '';

  
    this.store.dispatch(new fromStore.FetchAllDestinations());

    this.Destinations$ = this.store.select(fromStore.getAllDestinations);
       
  }

  ngOnDestroy() {
    
  }

  addNewTrip(){

  

    if (this.trip.from === this.trip.to) {
      this.error = true; this.errorText = 'Unete su dve iste destinacije'; return;
    }

    if (this.trip.from ==='' || this.trip.to === '' || this.trip.freeSeats === null ||
        this.trip.price === null || this.trip.distance === null || this.trip.extraLuggage === null ||
        this.trip.duration === '' || this.selectedDate === undefined)
        {
          this.error = true; this.errorText = 'Nisu uneti svi podaci'; return;
        }
        this.trip.time = new Date(this.selectedDate);

    this.error = false;
    this.store.dispatch(new fromStore.AddTrip(this.trip))
  }

  addNewDestination(){

    if (this.newDestination === ''){
      return;
    }
    this.store.dispatch(new fromStore.AddNewDestination(this.newDestination))
  }

}
