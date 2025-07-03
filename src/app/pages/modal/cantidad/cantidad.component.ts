import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cantidad',
  imports: [],
  templateUrl: './cantidad.component.html',
  styleUrl: './cantidad.component.css'
})
export class CantidadComponent {

constructor(
  public dialogRef: MatDialogRef<CantidadComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  
}
