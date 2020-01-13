import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  
  private startDate: Date;
  private subscription: Subscription;
  private selectedEndDate: Date;
  private selectedStartDate: Date;
  private selectedFrom: string;
  private selectedTo: string;
  private toDestinations$: Observable<string[]>;
  private fromDestinations$: Observable<string[]>;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.startDate = new Date();
    this.subscription = this.store.select(fromStore.selectFilterState).subscribe( res => {
      this.selectedFrom = res.from;
      this.selectedTo = res.to;
      this.selectedEndDate = res.endDate;
      this.selectedStartDate = res.startDate;
    })

    this.store.dispatch(new fromStore.FetchFromDestinations(''));
    this.store.dispatch(new fromStore.FetchToDestinations(''));


    this.toDestinations$ = this.store.select(fromStore.getToDestinations);
    this.fromDestinations$ = this.store.select(fromStore.getFromDestinations);
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  changeToDestination() {
    if (this.selectedTo === undefined) {
      this.selectedTo = '';
    }
    this.store.dispatch(new fromStore.FetchFromDestinations(this.selectedTo));
    this.store.dispatch(new fromStore.ChangeToDestination(this.selectedTo));
    this.store.dispatch(new fromStore.FetchTrips(this.selectedFrom, this.selectedTo))
  }

  changeFromDestination() {
    if (this.selectedFrom === undefined) {
      this.selectedFrom = '';
    }
    this.store.dispatch(new fromStore.FetchToDestinations(this.selectedFrom));
    this.store.dispatch(new fromStore.ChangeFromDestination(this.selectedFrom));
    this.store.dispatch(new fromStore.FetchTrips(this.selectedFrom, this.selectedTo))

  }

  onStartDateChange(){
    this.store.dispatch(new fromStore.ChangeStartDate(this.selectedStartDate));
  }

  onEndDateChange(){
    this.store.dispatch(new fromStore.ChangeEndDate(this.selectedEndDate));
  }

}
