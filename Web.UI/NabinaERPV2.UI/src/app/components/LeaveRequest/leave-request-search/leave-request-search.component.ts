import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { LeaveRequestModel } from 'src/app/models/transaction-pages.model';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { LeaveRequestService } from 'src/app/services/TransactionPages/leave-request.service';

@Component({
  selector: 'app-leave-request-search',
  templateUrl: './leave-request-search.component.html',
  styleUrls: ['./leave-request-search.component.css']
})
export class LeaveRequestSearchComponent implements OnInit {

  BraId: number = 0;
  NationalityList: any;
  empNo = null;
  empName = null; 
  nationality = '';
  leaveFrom = '';
  leaveTo = '';
  rpNo = 0; 

  leaveRequest?: LeaveRequestModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LeaveRequestSearchComponent>;

  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = 0;
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }
  @ViewChild('status') status!: ElementRef;
  selectedStatus = 0;
  onSelectedStatus(): void {
    this.selectedStatus = this.natlist.nativeElement.value;
  }

  displayedColumns: string[] = ['action', 'id', 'empNo', 'leaveFrom', 'leaveTo', 'empName', 'empDepartment', 'empDesignation', 'empNationality', 'rpNo', 'type', 'status'];
  dataSource: any;

  constructor(private router: Router, private comService: CommonHRService, private leaveService: LeaveRequestService) { }

  ngOnInit(): void {
    this.NationalitylistBind();
    this.BraId = 2;
    // this.FetchLeaveRequests();
  }

  NationalitylistBind(): void {
    this.comService.getNationality()
      .subscribe({
        next: (data) => {
          this.NationalityList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  //   FetchLeaveRequests(): void {
  //     this.leaveService.getAll(this.BraId) 
  //     .subscribe({
  //       next: (data) => {
  //         this.leaveRequest = data;
  //         this.dataSource = new MatTableDataSource<LeaveRequestModel>(this.leaveRequest);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         this.dataSource.disableClear = true;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  subtractYear(date:Date, year:number)  {
   date.setFullYear(date.getFullYear()-year);
   return date;
  } 

  search():void {
    var cyear = new Date()
    var currentyear = cyear.toISOString();
    var lyear = this.subtractYear(cyear,1);
    var lastyear = lyear.toISOString();
 
    if (this.leaveFrom == '' && this.leaveTo == '') {
      this.leaveFrom = lastyear;
      this.leaveTo = currentyear;
    } 
    this.leaveService.findLeaveRequest(this.empName, this.empNo, this.leaveFrom, this.leaveTo, this.rpNo, this.selectedNational, this.selectedStatus)
      .subscribe({
        next: (data) => {
          this.leaveRequest = data;
          this.dataSource = new MatTableDataSource<LeaveRequestModel>(this.leaveRequest);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });

  }
}
