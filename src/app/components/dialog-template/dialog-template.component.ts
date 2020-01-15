import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onClick(){
    
  }

}
