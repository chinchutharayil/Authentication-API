import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/setup-pages.model';
import { DepartmentService } from 'src/app/services/SetupPages/department.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent {
  deptForm!: FormGroup
  alert: boolean = false;
  alertError: boolean = false;
  updatealert: boolean = false; 
  deptId: number = 0;
 
  department:any={};
  submitted: boolean = false;

  constructor(private DepartmentService: DepartmentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.deptId = +this.route.snapshot.params['id'];
    this.BindDepartment();
    this.deptForm = this.formBuilder.group({
      name: ['', Validators.required,],
      sortOrder: ['', Validators.required],
      shortName: '',
      isActive: false
    });
  }

  get f() { return this.deptForm.controls; }

  saveDepartment(): void { 
    debugger
    this.submitted = true;
    if (this.deptForm.invalid) {
      return
    }
    if (this.deptId > 0) {
      const data = {
        Id:this.deptId,
        Name: this.department.name,
        SortOrder: this.department.sortOrder,
        ShortName: this.department.shortName,
        IsActive: this.department.isActive
      };
      this.DepartmentService.update(this.deptId, data).subscribe({
        next: (res) => {
          this.updatealert = true;
          console.log(data);
          console.log(res); 
          this.submitted = true;
          this.router.navigate(['/department',this.deptId]);
        },
        error: (e) => {
          this.alertError = true;
          console.error(e);
        }
      })
    }
    else {
      const data = {
        Name: this.department.name || null,
        SortOrder: this.department.sortOrder || null,
        ShortName: this.department.shortName || null,
        IsActive: this.department.isActive
      };
      this.DepartmentService.create(data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/department', res.Id]);
          },
          error: (e) => {
            this.alertError = true;
            console.error(e)
          }
        });
    }
  }

  BindDepartment(){ 
    debugger
    this.DepartmentService.get(this.deptId).subscribe((data) =>{
      this.department = {
        name:data.name,
        shortName:data.shortName,
        sortOrder:data.sortOrder,
        isActive:data.isActive
      };
    });
  }

  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.alertError = false; }
  closeUpdateAlert() { this.updatealert = false; }

  redirect(): void {
    this.router.navigate(['/department']);
  }
}


