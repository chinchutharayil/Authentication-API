import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LeaveRequestModel } from 'src/app/models/transaction-pages.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeePopupComponent } from '../../Common/employee-popup/employee-popup.component';
import { LeaveRequestService } from 'src/app/services/TransactionPages/leave-request.service';

@Component({
  selector: 'app-leave-request-master',
  templateUrl: './leave-request-master.component.html',
  styleUrls: ['./leave-request-master.component.css']
})
export class LeaveRequestMasterComponent implements OnInit {

  leaveId: number = 0;
  submitted: boolean = false;
  alert: boolean = false;
  erroralert: boolean = false;
  leaveRequestForm!: FormGroup
  leaveHodForm!: FormGroup
  leavePerForm!: FormGroup
  leaveAccForm!: FormGroup
  leaveMngmntForm!: FormGroup
  leaveTicketForm!: FormGroup
  typeList: any;
  days = 6;

  @ViewChild('type') type!: ElementRef;
  selectedType = '';
  onSelectedType(): void {
    this.selectedType = this.type.nativeElement.value;
  }

  onSelectedNational() { }

  leaveRequest: any = {}
  leaveRequestHod: any = {}
  leaveRequestPer: any = {}
  leaveRequestAcc: any = {}
  leaveRequestMd: any = {}
  leaveRequestTick: any = {}

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private formBuilder: FormBuilder, private leaveService: LeaveRequestService, private router: Router) { }

  ngOnInit(): void {
    this.leaveId = +this.route.snapshot.params['id'];
    // this.leaveRequestForm = this.formBuilder.group({
    // });
    this.leaveRequestForm = new FormGroup({
      // empName: new FormControl(),
      from: new FormControl(),
      to: new FormControl(),
      days: new FormControl(),
      leavetype: new FormControl(),
      destination: new FormControl(),
      destairport: new FormControl(),
      purpose: new FormControl(),
      traveldate: new FormControl(),
      returndate: new FormControl(),
      // ticketby: new FormControl(),
      // ticket: new FormControl(),
      empremarks: new FormControl(),
      remployee: new FormControl(),
      rcompany: new FormControl(),
      twoway: new FormControl(),
      oneway: new FormControl(),
    });
    this.leaveHodForm = new FormGroup({
      days: new FormControl(),
      hremarks: new FormControl(),
    });
    this.leavePerForm = new FormGroup({
      idno: new FormControl(),
      rpval: new FormControl(),
      prremarks: new FormControl()
    });
    this.leaveAccForm = new FormGroup({
      dateofrejoin: new FormControl(),
      leventitle: new FormControl(),
      levappdate: new FormControl(),
      accremarks: new FormControl(),
      finalappdays: new FormControl(),
      destination: new FormControl(),

    });
    this.leaveMngmntForm = new FormGroup({
      earnleave: new FormControl(),
      mremarks: new FormControl(),

    });
    this.leaveTicketForm = new FormGroup({
      traveldate: new FormControl(),
      toairline: new FormControl(),
      normalfare: new FormControl(),
      tnormalfare: new FormControl(),
      tappfare: new FormControl(),
      tfarediff: new FormControl(),
      returndate: new FormControl(),
      rairline: new FormControl(),
      rnormalfare: new FormControl(),
      rappfare: new FormControl(),
      rfarediff: new FormControl(),
      tremarks: new FormControl(),
    });
  }

  SaveLeaveRequest(): void {
    debugger
    this.submitted = true;
    if (this.leaveId > 0) {
      const data = {
        Id: this.leaveId,
        Status: this.leaveRequest.status || null,
        StartDate: this.leaveRequest.startDate || null,
        EndDate: this.leaveRequest.endDate || null,
        Destination: this.leaveRequest.destination || null,
        DestinationAirport: this.leaveRequest.destinationAirport || null,
        RequestedDays: this.leaveRequest.requestedDays || null,
        Purpose: this.leaveRequest.purpose || null,
        TravelDate: this.leaveRequest.travelDate || null,
        ReturnDate: this.leaveRequest.returnDate || null,
        EmpRemarks: this.leaveRequest.empRemarks || null
      }
      this.leaveService.update(this.leaveId, data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/LeaveRequest', data.Id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
    else {
      const data = {
        //Status:this.leaveRequest.status || null,
        StartDate: this.leaveRequest.startDate || null,
        EndDate: this.leaveRequest.endDate || null,
        Destination: this.leaveRequest.destination || null,
        DestinationAirport: this.leaveRequest.destinationAirport || null,
        RequestedDays: this.leaveRequest.requestedDays || null,
        Purpose: this.leaveRequest.purpose || null,
        TravelDate: this.leaveRequest.travelDate || null,
        ReturnDate: this.leaveRequest.returnDate || null,
        EmpRemarks: this.leaveRequest.empRemarks || null
      }
      this.leaveService.create(data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/LeaveRequest', res.id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
  } 
  SaveHOD(): void {
    debugger
    this.submitted = true;
    if (this.leaveId > 0) {
      const data = {
        Id: this.leaveId,
        ApprovedDays: this.leaveRequestHod.approvedDays || null,
        HrRemarks: this.leaveRequestHod.hrRemarks || null
      }
      this.leaveService.update(this.leaveId, data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/LeaveRequest', data.Id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
  }
  SavePersonal(): void {
    debugger
    this.submitted = true;
    if (this.leaveId > 0) {
      const data = {
        Id: this.leaveId,
        RpNumber: this.leaveRequestPer.rpnumber || null,
        RPValDate: this.leaveRequestPer.rpvalDate || null,
        PrRemarks: this.leaveRequestPer.prRemarks || null
      }
      this.leaveService.update(this.leaveId, data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/LeaveRequest', data.Id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
  }
  SaveAccounts():void {

   } 
  SaveManagement(): void {
    debugger
    this.submitted = true;
    if (this.leaveId > 0) {
      const data = {
        Id: this.leaveId, 
        ApprovedDays: this.leaveRequestMd.approvedDays || null,
        MdRemarks: this.leaveRequestMd.mdRemarks || null
      }
      this.leaveService.update(this.leaveId, data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/LeaveRequest', data.Id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
  }

  SaveTicket():void { }

  openDialog() {
    const popup = this.dialog.open(EmployeePopupComponent, {
      width: '60%', height: '70%',
      enterAnimationDuration: '1000ms', exitAnimationDuration: '1000ms',
      data: {
        name: 'abhi', type: 'bhi'
      }
    });
    popup.afterClosed().subscribe(empdata => {
      console.log(empdata);
    });
  }

  // public handleError = (controlName: string, errorName: string) => {
  //   // return this.empmasterForm.controls[controlName].hasError(errorName);
  // };

}

// @Component({
//   selector: 'app-leave-hod',
//   templateUrl: './leave-request-master.component.html',
//   styleUrls: ['./leave-request-master.component.css']

// })
// export class LeaveHODComponent implements OnInit{

// }
