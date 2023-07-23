import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { style } from '@angular/animations';
import { BlockScrollStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog, ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'700px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

