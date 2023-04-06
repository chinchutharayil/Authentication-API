import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DutyResumeModel } from 'src/app/models/transaction-pages.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DutyresumeService } from 'src/app/services/TransactionPages/dutyresume.service';

@Component({
  selector: 'app-duty-resume-master',
  templateUrl: './duty-resume-master.component.html',
  styleUrls: ['./duty-resume-master.component.css']
})
export class DutyResumeMasterComponent implements OnInit {
  dutyresumeId : number = 0;
  submitted: boolean = false;
  alert: boolean=false; 
  erroralert: boolean = false;
  DutyResumeForm!: FormGroup;

  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = '';
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }
  dutyResume: any = {}
  constructor(private route:ActivatedRoute ,private formBuilder: FormBuilder, private dutyresumerervice:DutyresumeService, private router:Router) { }


  ngOnInit(): void {
    this.dutyresumeId =+this.route.snapshot.params['id'];
  }


  SaveDutyResume(): void {
  debugger
  this.submitted = true;
    if (this.dutyresumeId > 0){
    const data ={ 
      Id:this.dutyresumeId,
      LeaveId : this.dutyResume.leaveId  , 
      ResumeDate : this.dutyResume.resumeDate,
      SubmittedDate : this.dutyResume.submitteddate , 
      ExcdDays : 5  , 
      Remarks : this.dutyResume.drremarks
      }
    this.dutyresumerervice.update(this.dutyresumeId,data)
    .subscribe({
      next: (res) => {
        this.alert = true;
        console.log(res);
        this.submitted = true;  
        this.router.navigate(['/EmployeeMaster',data.Id]);           
      },
      error: (e) => {
        console.error(e);
        this.erroralert = true;
      }
    });    
 }
 else{
      const data ={  
        LeaveId : this.dutyResume.leaveId  , 
        ResumeDate : this.dutyResume.resumeDate,
        SubmittedDate : this.dutyResume.submitteddate , 
        ExcdDays : 5  , 
        Remarks : this.dutyResume.drremarks
    }
  this.dutyresumerervice.create(data)
  .subscribe({
    next: (res) => {
      this.alert = true;
      console.log(res);
      this.submitted = true;  
      this.router.navigate(['/EmployeeMaster',res.id]);           
    },
    error: (e) => {
      console.error(e);
      this.erroralert = true;
    }
  });
 }
}



  public handleError = (controlName: string, errorName: string) => {
    // return this.empmasterForm.controls[controlName].hasError(errorName);
  };

}
