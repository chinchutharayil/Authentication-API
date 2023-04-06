import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeSearchService } from 'src/app/services/SetupPages/employee.service';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { FormGroup, FormControl, FormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs'; 
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-salary-info',
  templateUrl: './salary-info.component.html',
  styleUrls: ['./salary-info.component.css'],
  providers: [DatePipe],
})
export class EmployeeSalaryComponent {
  Flag2: number = 0;
  EmpId: number = 0;
  empsalaryForm!: FormGroup
  empMaster !: FormGroup
  UnitList: any;
  AccomodationList: any;  
  alert: boolean = false;
  erroralert: boolean = false;
  updatealert: boolean = false;
  totalSal: number = 0;
  
  @ViewChild('unit') unit!: ElementRef;
  selectedUnit = '';
  onSelectedUnit(): void {
    this.selectedUnit = this.unit.nativeElement.value;
  }
  @ViewChild('accomodation') accomodation!: ElementRef;
  selectedAccomodation = '';
  onSelectedAccomodation(): void {
    this.selectedAccomodation = this.accomodation.nativeElement.value;
  }

  empSalMaster: any = {
    id: 0,
  };

  submitted = false;
  constructor(private datePipe: DatePipe,  private router: Router, private _sanitizer: DomSanitizer, private empService: EmployeeSearchService, private route: ActivatedRoute, private comService: CommonHRService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.EmpId = +this.route.snapshot.params['id']; 
   this.Flag2 = 2;
    this.UnitListBind();
    this.AccomodationListBind();
    this.BindEditEmployeeSalary();
    this.total();

    this.empsalaryForm = this.formBuilder.group({
      accomodation:'',
      unit:'',
      basicsal:['',[Validators.required, Validators.pattern('[0-9]*')]],  
      hra: ['',Validators.pattern('[0-9]*')],
      trallowance: ['',Validators.pattern('[0-9]*')],
      seniorityallowance: ['',Validators.pattern('[0-9]*')],
      branchallowance: ['',Validators.pattern('[0-9]*')],
      fuelallowance: ['',Validators.pattern('[0-9]*')],
      ticketallowance: ['',Validators.pattern('[0-9]*')],
      meritallowance: ['',Validators.pattern('[0-9]*')],
      telephoneallowance: ['',Validators.pattern('[0-9]*')],
      skillallowance: ['',Validators.pattern('[0-9]*')],
      otherallowance: ['',Validators.pattern('[0-9]*')],
      cbstraightshift: false,
      cbovertime: false,
      cbairfare: false
    });
  }

  get f() { return this.empsalaryForm.controls; }
  SaveEmpSalaryInfo(): void {

  this.submitted = true; 
  if (this.empsalaryForm.invalid) {
    return
  }
    if (this.EmpId > 0) {
      const data = {
        Id: this.EmpId,
        BasicSalary: this.empSalMaster.basicSalary,
        Hra: this.empSalMaster.hra,
        TransportAllowance: this.empSalMaster.TransportAllowance,
        SeniorityAllowance: this.empSalMaster.SeniorityAllowance, 
        BranchAllowance: this.empSalMaster.BranchAllowance,
        FuelAllowance: this.empSalMaster.FuelAllowance,
        TicketAllowance: this.empSalMaster.TicketAllowance,
        MeritAllowance: this.empSalMaster.MeritAllowance,
        TelephoneAllowance: this.empSalMaster.TelephoneAllowance,
        SkillAllowance: this.empSalMaster.SkillAllowance,
        OtherAllowance: this.empSalMaster.OtherAllowance,
        UnitId: this.unit.nativeElement.value || 1,
        AccomodationId: this.accomodation.nativeElement.value || 12, 
        ShiftStatus: this.empSalMaster.straightshiftcb|| false,
        OvertimeStatus: this.empSalMaster.overtimecb ||false,
        IsEligibleforAirfare: this.empSalMaster.airfarecb || false,
        TotalSalary: this.empSalMaster.totalSal =(Number(this.empSalMaster.basicSalary) + Number(this.empSalMaster.hra) + Number(this.empSalMaster.TransportAllowance) +
        Number(this.empSalMaster.SeniorityAllowance) + Number(this.empSalMaster.BranchAllowance) + Number(this.empSalMaster.FuelAllowance) +
        Number(this.empSalMaster.TicketAllowance) + Number(this.empSalMaster.MeritAllowance) + Number(this.empSalMaster.TelephoneAllowance) +
        Number(this.empSalMaster.SkillAllowance) + Number(this.empSalMaster.OtherAllowance))
      };
      this.empService.update(this.EmpId,this.Flag2, data)
        .subscribe({
          next: (res)=>{
            this.updatealert = true;
            console.log(res);
            this.submitted = true; 
            this.router.navigate(['/EmployeeMaster', data.Id]);
          },
          error:(e) =>{
            console.log(e);
            this.erroralert = true;
          } 
        });

    } 
    this.total();
  }

  total():Number
  { 
  return (Number(this.empSalMaster.basicSalary) + Number(this.empSalMaster.hra) + Number(this.empSalMaster.TransportAllowance) +
    Number(this.empSalMaster.SeniorityAllowance) + Number(this.empSalMaster.BranchAllowance) + Number(this.empSalMaster.FuelAllowance) +
    Number(this.empSalMaster.TicketAllowance) + Number(this.empSalMaster.MeritAllowance) + Number(this.empSalMaster.TelephoneAllowance) +
    Number(this.empSalMaster.SkillAllowance) + Number(this.empSalMaster.OtherAllowance));  
    
    console.log (Number(this.empSalMaster.basicSalary) + Number(this.empSalMaster.hra) + Number(this.empSalMaster.TransportAllowance) +
    Number(this.empSalMaster.SeniorityAllowance) + Number(this.empSalMaster.BranchAllowance) + Number(this.empSalMaster.FuelAllowance) +
    Number(this.empSalMaster.TicketAllowance) + Number(this.empSalMaster.MeritAllowance) + Number(this.empSalMaster.TelephoneAllowance) +
    Number(this.empSalMaster.SkillAllowance) + Number(this.empSalMaster.OtherAllowance));
  }
  BindEditEmployeeSalary() { 
    this.empService.get(this.EmpId).subscribe((data) => {

      this.totalSal = (data.basicSalary + data.hra + data.transportAllowance + data.seniorityAllowance +
                      data.branchAllowance + data.fuelAllowance + data.ticketAllowance + data.meritAllowance + 
                      data.telephoneAllowance + data.skillAllowance + data.otherAllowance);
      this.empSalMaster = {
        basicSalary: data.basicSalary,
        hra: data.hra,
        TransportAllowance: data.transportAllowance,
        SeniorityAllowance: data.seniorityAllowance,
        BranchAllowance: data.branchAllowance,
        FuelAllowance: data.fuelAllowance,
        TicketAllowance: data.ticketAllowance,
        MeritAllowance: data.meritAllowance,
        TelephoneAllowance: data.telephoneAllowance,
        SkillAllowance: data.skillAllowance,
        OtherAllowance: data.otherAllowance,
        AccomodationId: data.accomodationId,
        straightshiftcb:data.shiftStatus,
        overtimecb: data.overtimeStatus,
        airfarecb: data.isEligibleforAirfare,
        UnitId: data.unitId 
      };
    });
  }

  AccomodationListBind(): void {
    this.comService.getAccomodation()
      .subscribe({
        next: (data) => {
          this.AccomodationList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  UnitListBind(): void {
    this.comService.getUnit()
      .subscribe({
        next: (data) => {
          this.UnitList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  public handleError = (controlName: string, errorName: string) => {
    return this.empsalaryForm.controls[controlName].hasError(errorName);
  }; 

  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.erroralert = false; }
  closeUpdateAlert() { this.updatealert = false; }
}
