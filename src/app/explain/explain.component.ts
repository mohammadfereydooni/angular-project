import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserData } from '../model/project';
import { MatTableDataSource } from '@angular/material/table';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { Vegetable } from '../model/Vegetable';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {MatChipsModule} from '@angular/material/chips';
import {NgFor} from '@angular/common';
import { DialogGroupsComponent } from '../dialog-groups/dialog-groups.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.scss'],
})
export class ExplainComponent implements OnInit {
  displayedColumns: string[] = ['mid', 'title', 'type'];

  data!: UserData[];
  vegetables!: any ;
  dataProject: any;
  

  dataSource!: MatTableDataSource<Vegetable[]>;
  panelOpenState = false;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private announcer : LiveAnnouncer
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogGroupsComponent,{
      width: '500px',
      data:{
        datakey: this.dataProject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {



    const id = this.route.snapshot.queryParamMap.get('id');
    if (id == null) {
      window.alert('warning');
      this.router.navigate(['/']);
    } else {
      this.getProjectData(id as string);

    }

    // this.getCategory(id as String);
  }

  getProjectData(id: string) {
    this.apiService.getProject(id).subscribe({
      next: (res) => {
        console.log(res);


        this.dataProject = res;
        this.dataSource = new MatTableDataSource(res.groups[0].keywords);
        this.vegetables =res.groups[0].keywords;
        console.log(this.vegetables);

      },
    });

    this.dataProject = this.data;


  }






  //   {name: 'apple'},
  //   {name: 'banana'},
  //   {name: 'strawberry'},
  //   {name: 'orange'},
  //   {name: 'kiwi'},
  //   {name: 'cherry'},
  // ];
  //

  drop(event: CdkDragDrop<Vegetable[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

backHome(){
  history.back();
}

remove(vegetable: string): void {
  const index = this.vegetables.indexOf(vegetable);

  if (index >= 0) {
    this.vegetables.splice(index, 1);

    this.announcer.announce(`Removed ${vegetable}`);
  }
}

}

  // getCategory(id:string) {
  //   this.apiService.getProject(id).subscribe({
  //     next: (res) => {
  //       this.dataProject = new MatTableDataSource();

  //     },
  //   });
  // }

