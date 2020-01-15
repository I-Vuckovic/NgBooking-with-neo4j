import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AngularNeo4jModule} from 'angular-neo4j';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReservationCodeComponent } from './components/reservation-code/reservation-code.component';
import { ReservationSearchComponent } from './components/reservation-search/reservation-search.component';
import { ReservationInfoComponent } from './components/reservation-info/reservation-info.component';
import { TripInputComponent } from './components/trip-input/trip-input.component';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TripListComponent,
    SearchBarComponent,
    PaymentComponent,
    ReservationCodeComponent,
    ReservationSearchComponent,
    ReservationInfoComponent,
    TripInputComponent,
    DialogTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, "NgBooking"),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MaterializeModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot(effects),
    FormsModule,
    FilterPipeModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularNeo4jModule
  ],
  entryComponents: [ReservationCodeComponent, DialogTemplateComponent],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
