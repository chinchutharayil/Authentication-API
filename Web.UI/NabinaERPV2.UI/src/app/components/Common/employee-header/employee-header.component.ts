import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee.model';
import { CommonHRService } from 'src/app/services/commonHR.service';

@Component({
  selector: 'app-employee-header',
  template: `
    <div class="card card-primary card-outline">
  <div class="card-body box-profile row">

    <div class="text-left col-sm-1">
      <img class="profile-user-img img-fluid img-circle" [src]="imagePath" alt="User profile picture">
    </div>

    <div class="text-left"> <br>
      <h3>{{empMaster.firstName}} {{empMaster.secondName}} {{empMaster.lastName}} <br>
        || {{empMaster.deptName}}|| {{empMaster.desigName}} || {{empMaster.status}}</h3>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class EmployeeHeaderComponent implements OnInit {

  EmpId: number = 0;
  imagePath!: any;
  base64code!: any;
  empMaster: any = {
  };

  constructor(private comService: CommonHRService, private _sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.EmpId = +this.route.snapshot.params['id'];
    this.BindEmployee();
  }

  BindEmployee() {
    this.comService.getHeaderDetails(this.EmpId).subscribe((data) => {
      var toReturnImage = data.document;
      this.base64code = toReturnImage;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64code);
      this.empMaster = {
        status: data.status,
        deptName: data.empDepartment,
        desigName: data.empDesignation,
        firstName: data.firstName,
        secondName: data.secondName,
        lastName: data.lastName,

      };
    })

  }

}
