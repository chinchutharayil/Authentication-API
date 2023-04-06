import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeSearchService } from 'src/app/services/SetupPages/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DesignationService } from 'src/app/services/SetupPages/designation.service';
import { DepartmentService } from 'src/app/services/SetupPages/department.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  BraId: number = 0;
  DesignationList: any;
  DepartmentList: any;
  SponsorList: any;
  NationalityList: any;

  employee?: EmployeeModel[];
  currentemployees: EmployeeModel = {};
  currentIndex = -1;
  empNo = null;
  empName = null;
  departmentId = 0;
  nationality = '';
  department = '';
  designation = '';
  rpNo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeeSearchComponent>;

  @ViewChild('desg') desg!: ElementRef;
  selectedDesignation = 0;
  onSelectedDesignation(): void {
    this.selectedDesignation = this.desg.nativeElement.value;
  }
  @ViewChild('dept') dept!: ElementRef;
  selectedDepartment = 0;
  onSelectedDepartment(): void {
    this.selectedDepartment = this.dept.nativeElement.value;
  }
  @ViewChild('sponsor') sponsor!: ElementRef;
  selectedSponsor = 0;
  onSelectedSponsor(): void {
    this.selectedSponsor = this.sponsor.nativeElement.value;
  }
  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = 0;
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }
  @ViewChild('status') status!: ElementRef; 
  selectedStatus = 0;
  onChangeStatus(): void {  
    this.selectedStatus = this.status.nativeElement.value;
  }
  displayedColumns: string[] = ['action', 'id', 'empNo', 'empName', 'managerName', 'empDepartment', 'empDesignation', 'empNationality', 'rpNo', 'empSponsorName', 'status'];
  dataSource: any; 
  constructor(private empSearchService: EmployeeSearchService,private route: ActivatedRoute, private router: Router, private comService: CommonHRService, private deptService: DepartmentService, private desgService: DesignationService) { }
  ngOnInit(): void {
    this.BraId = 2;
    // this.retrieveEmployees();
    this.DepartmentListBind();
    this.DesignationListBind();
    this.SponsorListBind();
    this.NationalitylistBind();   
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
  DesignationListBind(): void {
    this.desgService.getDesignationList()
      .subscribe({
        next: (data) => {
          this.DesignationList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  SponsorListBind(): void {
    this.comService.getSponsorList()
      .subscribe({
        next: (data) => {
          this.SponsorList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  DepartmentListBind(): void {
    this.deptService.getDeptList()
      .subscribe({
        next: (data) => {
          this.DepartmentList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  retrieveEmployees(): void {
      this.empSearchService.getAll(this.BraId)
    //this.empSearchService.getAll()
      .subscribe({
        next: (data) => {
          this.employee = data;
          this.dataSource = new MatTableDataSource<EmployeeModel>(this.employee);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.disableClear = true;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveEmployees();
    this.currentemployees = {};
    this.currentIndex = -1;
  }
  setActiveEmployee(employee: EmployeeModel, index: number): void {
    this.currentemployees = employee;
    this.currentIndex = index;
  }
  searchTitle(): void { 
    this.currentemployees = {};
    this.currentIndex = -1;
    if (this.empName == "") {
      this.empName = null;
    }
    else if (this.empNo == "") {
      this.empNo = null;
    }
    this.empSearchService.findByEmployee(this.empName, this.empNo, this.selectedDepartment, this.selectedDesignation, this.selectedSponsor, this.selectedNational, this.selectedStatus)
      .subscribe({
        next: (data) => {
          this.employee = data;
          this.dataSource = new MatTableDataSource<EmployeeModel>(this.employee);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

//   changeStatus(e:any)
//  {
//   //   console.log(e.value)
//   //   this.empform.status.setValue(e.target.value, {
//   //     onlySelf: true
//   //   })
//   }
   
  // get Status() {
  //   return this.Status.get('status');
  // }
  goToAddPage(): void {
    this.router.navigate(['add']);
  }

}
