import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/models/employee.model';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { DepartmentService } from 'src/app/services/SetupPages/department.service';
import { DesignationService } from 'src/app/services/SetupPages/designation.service';

@Component({
  selector: 'app-employee-popup',
  templateUrl: './employee-popup.component.html',
  styleUrls: ['./employee-popup.component.css']
})
export class EmployeePopupComponent implements OnInit {

  BraId: number = 0;
  DesignationList: any;
  DepartmentList: any;
  NationalityList: any;
  status = 'active';

  employee?: EmployeeModel[];

  empNo = null;
  empName = null;
  departmentId = 0;
  nationality = '';
  department = '';
  designation = '';
  rpNo = '';

  @ViewChild(MatTable) table!: MatTable<EmployeePopupComponent>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = 0;
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }

  displayedColumns: string[] = ['action', 'empNo', 'empName', 'empDepartment', 'empDesignation', 'empNationality'];
  dataSource: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private Ref: MatDialogRef<EmployeePopupComponent>, private comService: CommonHRService, private deptService: DepartmentService, private desgService: DesignationService,) { }

  result: any;

  ngOnInit(): void {
    console.log(this.data);
    this.result = this.data; 
    this.DepartmentListBind();
    this.DesignationListBind();
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
  // retrieveEmployees(): void {
  //   this.comService.getEmployeePopup() 
  //     .subscribe({
  //       next: (data) => {
  //         this.employee = data;
  //         this.dataSource = new MatTableDataSource<EmployeeModel>(this.employee);
  //         this.dataSource.paginator = this.paginator; 
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  search() { 
    if (this.empName == "") {
      this.empName = null;
    }
    else if (this.empNo == "") {
      this.empNo = null;
    }
    this.comService.empPopupSearch(this.empName, this.empNo, this.selectedDepartment, this.selectedDesignation, this.selectedNational, this.status)
      .subscribe({
        next: (data) => {
          this.employee = data;
          this.dataSource = new MatTableDataSource<EmployeeModel>(this.employee);
          this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  BindEmployeeForm() { }
  closePopup() {
    this.Ref.close("cloase");
  }
}
