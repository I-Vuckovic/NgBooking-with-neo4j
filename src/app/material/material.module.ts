import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
  MatDialogModule
} from "@angular/material";

const material = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
  MatDialogModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
