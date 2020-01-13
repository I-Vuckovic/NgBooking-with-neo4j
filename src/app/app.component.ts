import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './models/trip.model';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private trips$: Observable<Trip[]>;
  title = 'NgBooking';

  constructor(private store: Store<fromStore.AppState>, private afs: AngularFireStorage) {
  }

  ngOnInit(): void {


  }
}