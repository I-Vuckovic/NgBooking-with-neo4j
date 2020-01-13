import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {



  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    

    $(document).ready(() => {

      ($('.carousel.carousel-slider') as any).carousel({
        fullWidth: true,
        indicators: true
      });
    });

  }

  ngOnDestroy(): void {
    
  }

 
  navigateToTripList(){
    
  }


}
