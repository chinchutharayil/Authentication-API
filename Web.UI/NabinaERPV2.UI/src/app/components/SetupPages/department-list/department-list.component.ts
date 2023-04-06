import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/setup-pages.model';
import { DepartmentService } from 'src/app/services/SetupPages/department.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { catchError, map, merge, startWith, switchMap } from 'rxjs'; 
// import * as XLSX from 'xlsx';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  displayedColumns: string[] = ['action','id', 'name', 'shortName', 'isActive', 'sortOrder'];
  dataSource: any;

  departments?: DepartmentModel[];
  currentDepartment: DepartmentModel = {};
  currentIndex = -1;
  name = null;
  sorder = null;
  sname = null;   
  constructor(private departmentService: DepartmentService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.retrieveDepartments();   
  }

  retrieveDepartments(): void {
    this.departmentService.getAll()
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.dataSource = new MatTableDataSource<DepartmentModel>(this.departments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 

          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDepartments();
    this.currentDepartment = {};
    this.currentIndex = -1;
  }

  setActiveDepartment(department: DepartmentModel, index: number): void {  
    this.currentDepartment = department;
    this.currentIndex = index;
  } 

  searchTitle(): void { 
    this.currentDepartment = {};
    this.currentIndex = -1;

    this.departmentService.findByTitle(this.name, this.sorder)
      .subscribe({
        next: (data) => {
          this.departments = data;
          this.dataSource = new MatTableDataSource<DepartmentModel>(this.departments);
          this.dataSource.paginator = this.paginator;
         // this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
