import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { ContactInfoModel } from 'src/app/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ContactInfoService } from 'src/app/services/SetupPages/contact-Info.service';

@Component({
  selector: 'app-contact-Info',
  templateUrl: './contact-Info.component.html',
  styleUrls: ['./contact-Info.component.css']
})
export class ContactInformationComponent implements OnInit {


  EmpId: number = 0;
  ContactTypeId: number = 0;
  contactInfoForm!: FormGroup
  EmpContactType: any;
  CountryList: any;
  alertupdate: boolean = false;
  alert: boolean = false;
  alerterror: boolean = false;
  updatealert: boolean = false;
  submitted = false;
  ContactInfo?: ContactInfoModel[];

  EmpContactTypeModel: ContactInfoModel = {
    contactPersonName: '',
    contactPersonNumber: '',
    email: '',
    contactAddress: '',
    remarks: ''
  };

  @ViewChild(MatTable) table!: MatTable<ContactInfoModel>;
  @ViewChild('contacts') contacts!: ElementRef;
  selectedContact = '';
  onSelectedContactType(): void {
    this.selectedContact = this.contacts.nativeElement.value;
  }
  @ViewChild('country') country!: ElementRef;
  selectedCountry = '';
  onSelectedCountry(): void {
    this.selectedCountry = this.country.nativeElement.value;
  }

  EmpContactInfo: any = {
    id: 0,
    country: 0
  };
  empMaster: any = {
    id: 0,
  };

  displayedColumns: string[] = ['action', 'contactTypeName', 'contactPersonName', 'conatctNumber', 'email'];
  dataSource: any;

  constructor(private comService: CommonHRService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private ConInfoService: ContactInfoService) { }

  ngOnInit(): void {
    this.EmpId = +this.route.snapshot.params['id'];
    this.ContactTypeListBind();
    this.CountryListBind();
    this.BindContactTypes();

    this.contactInfoForm = this.formBuilder.group({
      contactType: '',
      name: '',
      number: '',
      email: '',
      address: '',
      CountryId: '',
      document: '',
      remarks: ''
    });
  }

  ContactTypeListBind(): void {
    this.comService.getContactType()
      .subscribe({
        next: (data) => {
          this.EmpContactType = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  CountryListBind(): void {
    this.comService.getCountry()
      .subscribe({
        next: (data) => {
          this.CountryList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  get f() { return this.contactInfoForm.controls; }

  SaveEmpContactInfo(): void {
    debugger
    this.submitted = true;
    if (this.contactInfoForm.invalid) {
      return
    }
    if (this.ContactTypeId > 0) {
      const data = {
        Id: this.ContactTypeId,
        EmpId: this.EmpId,
        ContactTypeID: this.contacts.nativeElement.value,
        Name: this.EmpContactInfo.contactPersonName,
        Number: this.EmpContactInfo.number,
        Email: this.EmpContactInfo.email,
        Address: this.EmpContactInfo.address,
        CountryID: this.country.nativeElement.value
      };
      debugger
      this.ConInfoService.update(this.ContactTypeId, data)
        .subscribe({
          next: (res) => {
            this.updatealert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/EmployeeMaster', data.EmpId]);
          },
          error: (e) => {
            console.error(e);
            this.alerterror = true;
          }
        });
          // data => {
          //   if (this.ContactTypeId == data.Id) {
          //     this.alertupdate = true;
          //   } else { 
          //     this.alerterror = true;
          //   }       
  }
    else {
  const data = {
    EmpId: this.EmpId,
    ContactTypeID: this.selectedContact,
    Name: this.EmpContactInfo.name || null,
    Number: this.EmpContactInfo.number || null,
    Email: this.EmpContactInfo.email || null,
    Address: this.EmpContactInfo.address || null,
    CountryId: this.selectedCountry
  };
  debugger
  this.ConInfoService.create(data)
    .subscribe({
      next: (res) => {
        debugger
        this.alert = true;
        console.log(res);
        this.submitted = true;
        this.router.navigate(['/EmployeeMaster', res.id]);
      },
      error: (e) => {
        console.error(e);
        this.alerterror = true;
      }
    });
} 
  }

BindContactTypes(): void {
  this.ConInfoService.get(this.EmpId)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.ContactInfo = data;
        this.dataSource = new MatTableDataSource<ContactInfoModel>(this.ContactInfo);
      },
      error: (e) => console.error(e)
    });
}

BindContactInfoForm(id: any): void
  {
    debugger
    this.ContactTypeId = id;
    this.ConInfoService.getById(id).subscribe((data) => {
      console.log(data);

      this.EmpContactInfo = {
        contact: data.contact,
        name: data.contactPersonName,
        number: data.contactPersonNumber,
        email: data.email,
        address: data.contactAddress,
        country: data.countryId,
        remarks: data.remarks
      }
    });
  }

  public handleError = (controlName: string, errorName: string) => {
  return this.contactInfoForm.controls[controlName].hasError(errorName);
};
}

