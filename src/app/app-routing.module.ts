import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ReservationSearchComponent } from './components/reservation-search/reservation-search.component';
import { TripInputComponent } from './components/trip-input/trip-input.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'trip-list', component: TripListComponent },
  { path: 'payment/:tripId', component: PaymentComponent },
  { path: 'reservation-search', component: ReservationSearchComponent },
  { path: 'trip-input', component: TripInputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
