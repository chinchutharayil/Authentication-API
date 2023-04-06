import { Component } from '@angular/core';
import { SectionModel } from 'src/app/models/setup-pages.model';
import { SectionService } from 'src/app/services/SetupPages/section.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent {
  secId : number=0;
  sectionForm!: FormGroup
  alert: boolean = false;
  alertError: boolean = false;
  updatealert: boolean = false;
  section: any = {};
  submitted:boolean = false;

  constructor(private sectionService: SectionService, private formBuilder: FormBuilder, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.secId = +this.route.snapshot.params['id'];
    this.BindSection();
    this.sectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      sortOrder: ['', Validators.required],
      isActive: false
    });
  }
  get f() { return this.sectionForm.controls; }

  saveSection():void {
    debugger
    this.submitted = true;
    if (this.sectionForm.invalid) {
      return
    }
    if (this.secId > 0) {
      const data = {
        Id:this.secId,
        Name: this.section.name,
        SortOrder: this.section.sortOrder,
        IsActive: this.section.isActive
      };
      this.sectionService.update(this.secId, data).subscribe({
        next: (res) => {
          this.updatealert = true;
          console.log(data);
          console.log(res); 
          this.submitted = true;
          this.router.navigate(['/section', data.Id]);
        },
        error: (e) => {
          this.alertError = true;
          console.error(e);
        }
      })
    }
    else{
      const data = {
        Name: this.section.name || null,
        SortOrder: this.section.sortOrder|| null,
        IsActive: this.section.isActive|| false
      };
  
      this.sectionService.create(data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/section', res.Id]);
          },
          error: (e) => {
            this.alertError = true;
            console.error(e)
          }
        });
    }   
  }

  BindSection(){ 
    this.sectionService.get(this.secId).subscribe((data) =>{
      this.section = {
        name:data.name, 
        sortOrder:data.sortOrder,
        isActive:data.isActive
      };
    });
  }
 
  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.alertError = false; }
  closeUpdateAlert() { this.updatealert = false; }
}
