import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../model/project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs';
import {MatButtonToggleGroup, MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  data:any;

  geo: 'US' | 'IR' = 'IR';
  disabled = false;


  hl!:string;





  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'scale',
    'hl',
    'geo',
    'scaleKeyword',
    'manegment'
  ];
  dataSource!: MatTableDataSource<UserData[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();


  }

  getAll() {
    this.api.getUser().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data=res;

      },
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToExplain(id: number) {
    this.router.navigate(['/explain'], {
      relativeTo: this.route,
      queryParams: { id: id },
      queryParamsHandling: 'merge',
    });
  }


   editProject(row: UserData[]) {
    this.dialog.open(DialogComponent, {
      data: row,
    });
  }

  deleteProject(id: number) {
    this.api.deletProject(id).subscribe({
      next: (res) => {
        alert('کاربر حذف شد !');
        this.getAll();
      },
    });
  }
}
