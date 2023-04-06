import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DesignationModel } from 'src/app/models/setup-pages.model';
import { DesignationService } from 'src/app/services/SetupPages/designation.service';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationsListComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DesignationsListComponent>;

  displayedColumns: string[] = ['action','id', 'name', 'maxStaff', 'isActive', 'sortOrder'];
  dataSource: any;

  designations?: DesignationModel[];
  currentDesignation: DesignationModel = {};
  currentIndex = -1;
  name = null;
  sorder = null;
  mxstaff = ''; 
  constructor(private designationService: DesignationService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveDesigantions();
  }

  retrieveDesigantions(): void {
    this.designationService.getAll()
      .subscribe({
        next: (data) => {
          this.designations = data;
          this.dataSource = new MatTableDataSource<DesignationModel>(this.designations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveDesigantions();
    this.currentDesignation = {};
    this.currentIndex = -1;
  }

  setActiveDesigantion(designation: DesignationModel, index: number): void {
    this.currentDesignation = designation;
    this.currentIndex = index;
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

  searchTitle(): void {
   debugger 
    this.currentDesignation = {};
    this.currentIndex = -1;
  
    this.designationService.findByDesignation(this.name, this.sorder)
      .subscribe({
        next: (data) => {
          this.designations = data; 
          // let currentUrl = this.router.url;
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          //     this.router.navigate([currentUrl]);
          //     console.log(currentUrl);
          // });
          this.dataSource = new MatTableDataSource<DesignationModel>(this.designations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data); 
        },
        error: (e) => console.error(e)
      });
  }
  goToAddPage(): void {
    this.router.navigate(['add']);
  }

  // removeAllTutorials(): void {
  //   this.designationService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

}
