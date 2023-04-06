import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'; 
import { DutyResumeModel } from 'src/app/models/transaction-pages.model';
import { CommonHRService } from 'src/app/services/commonHR.service'; 
import { DutyresumeService } from 'src/app/services/TransactionPages/dutyresume.service';

@Component({
  selector: 'app-duty-resume-search',
  templateUrl: './duty-resume-search.component.html',
  styleUrls: ['./duty-resume-search.component.css']
})
export class DutyResumeSearchComponent implements OnInit {

  NationalityList: any;
  empNo = null;
  empName = null;
  departmentId = 0;
  nationality = '';
  leaveFrom = '';
  leaveTo = '';
  rpNo = '';
  status = '';

  dutyResume?: DutyResumeModel[];
//  currentdutyRes: DutyResumeModel = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DutyResumeSearchComponent>;
  
  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = 0;
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }

  displayedColumns: string[] = ['action', 'id', 'empNo', 'leaveFrom', 'leaveTo', 'empName', 'empNationality', 'rpNo', 'type', 'status'];
  dataSource: any;

  constructor(private router: Router, private comService: CommonHRService, private dutyResService: DutyresumeService) { }

  ngOnInit(): void {
    this.NationalitylistBind();
    this.retrieveDutyResumes();
  }

  retrieveDutyResumes(): void {
    this.dutyResService.getAll()
      .subscribe({
        next: (data) => {
          this.dutyResume = data;
          debugger
          this.dataSource = new MatTableDataSource<DutyResumeModel>(this.dutyResume);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  NationalitylistBind(): void {
    this.comService.getNationality()
      .subscribe({
        next: (datas) => {
          this.NationalityList = datas;
          console.log(datas);
        },
        error: (e) => console.error(e)
      });
  }

  search() {
    debugger
    // this.currentemployees = {};
    // this.currentIndex = -1; 
    this.dutyResService.findDutyResume(this.empName, this.empNo, this.leaveFrom, this.leaveTo, this.rpNo, this.selectedNational, this.status)
      .subscribe({
        next: (data) => { 
          this.dutyResume = data; 
          this.dataSource = new MatTableDataSource<DutyResumeModel>(this.dutyResume);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);   
        },
        error: (e) => console.error(e)
      });

  }

}
