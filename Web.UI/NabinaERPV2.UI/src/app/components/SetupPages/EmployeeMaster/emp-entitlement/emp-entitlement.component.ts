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
  selector: 'app-emp-entitlement',
  templateUrl: './emp-entitlement.component.html',
  styleUrls: ['./emp-entitlement.component.css']
})

export class EmpEntitlementComponent {
  Flag : number =0;
  EmpId: number = 0;
  empEntitleForm!: FormGroup
  UnitList: any;
  AccomodationList: any;
  message = '';
  isVisible = false;
  isVisibleError = false;
  alert: boolean = false;
  erroralert: boolean = false;
  updatealert: boolean = false;

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

  empEntitleMaster: any = {
    id: 0,
  };

  submitted = false;
  constructor(private datePipe: DatePipe,  private router: Router, private _sanitizer: DomSanitizer, private empService: EmployeeSearchService, private route: ActivatedRoute, private comService: CommonHRService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.EmpId = +this.route.snapshot.params['id'];
    this.Flag = 3;
    this.UnitListBind();
    this.AccomodationListBind();
    this.BindEditEmployeeEntitle();

    this.empEntitleForm = this.formBuilder.group({
      accomodation:'',
      unit: '',
      basicsal: '',
      hra: '',
      trallowance: '',
      seniorityallowance: '',
      branchallowance: '',
      fuelallowance: '',
      ticketallowance: '',
      meritallowance: '',
      telephoneallowance: '',
      skillallowance: '',
      otherallowance: '',
      gratuityadvance: '',
      lopdays: '',
      airticket: '',
      gratuityeffectivedate: '',
      dateofpassage: '',
      dutyresumedate: '',
      image: '',
      cbstraightshift:'',
      cbovertime:'',
      cbairfare:''
    });
  }

  get f() { return this.empEntitleForm.controls; }
  SaveEmpEntitleDetails(): void {
  this.submitted = true; 
    if (this.EmpId > 0) {
      const data = {
        Id: this.EmpId,
        GratuityEffectiveDate: this.empEntitleMaster.gratuityeffectiveDate,
        gratuityAdvance: this.empEntitleMaster.gratuityAdvance,
        lopDays: this.empEntitleMaster.lopDays,
        airticketFare: this.empEntitleMaster.airticketFare,
        DateOfPassage: this.empEntitleMaster.dateOfPassage,
        DateofRejoin: this.empEntitleMaster.dateofRejoin,

      };
      this.empService.update(this.EmpId,this.Flag, data)
        .subscribe({
          next: (res) => {
          console.log(res);
          if (this.EmpId > 0) {
            this.updatealert = true;
            this.submitted = true;
            this.router.navigate(['/EmployeeMaster', data.Id]);
          }     
        },
        error: (e) => {
          console.error(e);
          this.erroralert = true;
        }
      }
          
          // data => {
          //   debugger
          //   if (this.EmpId == data.Id) {
          //     this.isVisible = true;     
          //   } else {
          //     this.message = 'something went wrong !';
          //     this.isVisibleError = true;
          //   }
          // }
          );

    } 
  }
  BindEditEmployeeEntitle() { 
    this.empService.get(this.EmpId).subscribe((data) => {
      var ged = new Date(data.gratuityEffectiveDate);
      var GED = this.datePipe.transform(ged,'yyyy-MM-dd');
      var dop = new Date(data.dateOfPassage);
      var DOP = this.datePipe.transform(dop,'yyyy-MM-dd');
      var dor = new Date(data.dateofRejoin);
      var DOR = this.datePipe.transform(dor,'yyyy-MM-dd');


      this.empEntitleMaster = {
        gratuityeffectiveDate: GED,
        gratuityAdvance: data.gratuityAdvance,
        lopDays: data.lopDays,
        airticketFare: data.airticketFare,
        dateOfPassage: DOP,
        dateofRejoin: DOR
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
    return this.empEntitleForm.controls[controlName].hasError(errorName);
  };

  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.erroralert = false; }
  closeUpdateAlert() { this.updatealert = false; }
}