import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Trip } from 'src/app/models/trip.model';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-reservation-code',
  templateUrl: './reservation-code.component.html',
  styleUrls: ['./reservation-code.component.scss']
})
export class ReservationCodeComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onClick(){
    this.dialogRef.close();
  }

}
