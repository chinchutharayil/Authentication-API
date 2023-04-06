import { Component } from '@angular/core';
import { DesignationModel } from 'src/app/models/setup-pages.model';
import { DesignationService } from 'src/app/services/SetupPages/designation.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent {

  desgId: number = 0;
  desgForm!: FormGroup
  alert: boolean = false;
  erroralert: boolean = false;
  updatealert: boolean =false;

  desg?:DesignationModel[];
  designation: any = {};

  submitted: boolean = false;

  constructor(private designationService: DesignationService, private formBuilder: FormBuilder, private route:ActivatedRoute) { }

  ngOnInit() {
    this.desgId = +this.route.snapshot.params['id'];
    this.BindDesignation();
    this.desgForm = this.formBuilder.group({
      name: ['', Validators.required],
      sortOrder: ['', Validators.required],
      maxStaff: '',
      isActive: false
    });
  }
  get f() { return this.desgForm.controls; }
  
  saveDesignation():void{
    debugger
    this.submitted = true;
    if (this.desgForm.invalid) {
      return
    }
    if (this.desgId > 0) {
      const data = {
        Id:this.desgId,
        Name: this.designation.name,
        SortOrder: this.designation.sortOrder,
        ShortName: this.designation.shortName,
        IsActive: this.designation.isActive
      };
      this.designationService.update(this.desgId, data).subscribe({
        next: (res) => {
          this.updatealert = true;
          console.log(data);
          console.log(res); 
          this.submitted = true;
        },
        error: (e) => {
          this.erroralert = true;
          console.error(e);
        }
      })
    }
    else{
      const data = {
      Name: this.designation.name,
      SortOrder: this.designation.sortOrder,
      MaxStaff: this.designation.maxStaff,
      IsActive: this.designation.isActive
    };
    this.designationService.create(data)
      .subscribe({
        next: (res) => {
          this.alert = true;
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          this.erroralert = true;
          console.error(e)
        }
      });}
    
  }

  BindDesignation()
  {
    this.designationService.get(this.desgId).subscribe((data) =>{
      this.designation = {
        name:data.name,
        maxStaff:data.maxStaff,
        sortOrder:data.sortOrder,
        isActive:data.isActive
      };
    });
  }
  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.erroralert = false; }
  closeUpdateAlert() { this.updatealert = false; }
} 