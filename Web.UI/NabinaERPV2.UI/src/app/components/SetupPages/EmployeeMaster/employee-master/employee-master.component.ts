import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeeSearchService } from 'src/app/services/SetupPages/employee.service';
import { DepartmentService } from 'src/app/services/SetupPages/department.service';
import { SectionService } from 'src/app/services/SetupPages/section.service';
import { DesignationService } from 'src/app/services/SetupPages/designation.service';
import { CommonHRService } from 'src/app/services/commonHR.service';
import { FormGroup, FormControl, FormBuilder, Validators, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs'; 
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css'],
  providers: [DatePipe],
})
export class EmployeeMasterComponent {
  Flag1: number = 0;
  EmpId: number = 0;
  empmasterForm!: FormGroup
  DepartmentList: any[] = [];
  SectionList: any;
  DesignationList: any;
  SponsorList: any;
  GradeList: any;
  CategoryList: any;
  BankList: any;
  UnitList: any;
  CompanyList: any;
  ManagerList: any;
  CbranchList: any;
  DateSelected: any;
  CountryList: any;
  Nationalitylist: any;
  AccomodationList: any;
  message = '';
  isVisible = false;
  isVisibleError = false;
  imagePath!: any;
  base64code!: any;
  alert: boolean = false;
  erroralert: boolean = false;
  updatealert: boolean = false;
statusColor:any;


  @ViewChild('dept') dept!: ElementRef;
  selectedDept = '';
  onSelectedDepartment(): void {
    this.selectedDept = this.dept.nativeElement.value;
  }
  @ViewChild('desg') desg!: ElementRef;
  selectedDesignation = '';
  onSelectedDesignation(): void {
    this.selectedDesignation = this.desg.nativeElement.value;
  }
  @ViewChild('sec') sec!: ElementRef;
  selectedSection = '';
  onSelectedSection(): void {
    this.selectedSection = this.sec.nativeElement.value;
  }
  @ViewChild('gender') gender!: ElementRef;
  selectedGender = '';
  onSelectedGender(): void {
    this.selectedGender = this.gender.nativeElement.value;
  }
  @ViewChild('cbranch') cbranch!: ElementRef;
  selectedCBranch = '';
  onSelectedBranch(): void {
    this.selectedCBranch = this.cbranch.nativeElement.value;
  }
  @ViewChild('sponsor') sponsor!: ElementRef;
  selectedSponsor = '';
  onSelectedSponser(): void {
    this.selectedSponsor = this.sponsor.nativeElement.value;
  }
  @ViewChild('grade') grade!: ElementRef;
  selectedGrade = '';
  onSelectedGrade(): void {
    this.selectedGrade = this.grade.nativeElement.value;
  }
  @ViewChild('repmgr') repmgr!: ElementRef;
  selectedRepMgr = '';
  onSelectedReportingMgr(): void {
    this.selectedRepMgr = this.repmgr.nativeElement.value;
  }
  @ViewChild('category') category!: ElementRef;
  selectedCategory = '';
  onSelectedCategory(): void {
    this.selectedCategory = this.category.nativeElement.value;
  }
  @ViewChild('bank') bank!: ElementRef;
  selectedBank = '';
  onSelectedBank(): void {
    this.selectedBank = this.bank.nativeElement.value;
  }
  @ViewChild('country') country!: ElementRef;
  selectedCountry = '';
  onSelectedCountry(): void {
    this.selectedCountry = this.country.nativeElement.value;
  }
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
  @ViewChild('natlist') natlist!: ElementRef;
  selectedNational = '';
  onSelectedNational(): void {
    this.selectedNational = this.natlist.nativeElement.value;
  }
  empMaster: any = {
    id: 0,
    DepartmentId: 0,
  };

  submitted = false;
  constructor(private datePipe: DatePipe,  private router: Router, private _sanitizer: DomSanitizer, private empService: EmployeeSearchService, private route: ActivatedRoute, private deptService: DepartmentService, private comService: CommonHRService, private secService: SectionService, private desigService: DesignationService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.EmpId = +this.route.snapshot.params['id'];
    this.Flag1 = 1;
    this.DepartmentListBind();
    this.SectionListBind();
    this.DesignationListBind();
    this.SponsorListBind();
    this.GradeListBind();
    this.CategoryListBind();
    this.BankListBind();
    this.UnitListBind();
    this.CompanyListBind();
    this.CompanyBranchListBind();
    this.ManagerListBind();
    this.CountryListBind();
    this.NationalitylistBind();
    this.AccomodationListBind();
    this.BindEditEmployee();
    // this.setImage();
      this.empmasterForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lstname:['', Validators.required],
      // gender: ['', Validators.required],
      // accomodation:['', Validators.required],
      // category: ['', Validators.required],
      // dept: ['', Validators.required],
      // section: ['', Validators.required],
      // designation: ['', Validators.required],
      // unit: ['', Validators.required],
      //grade: ['', Validators.required],
      // jdate: ['', Validators.required],
       CountryId: ['', Validators.required],
      // CountryId: '',
      // firstname: '',
      // lstname:'',
      gender: '',
      jdate: '',
      category: '',
      dept: ['', Validators.required],
      section: '',
      designation: '',
      unit: '',
      grade: '' ,
      code: '',
      mname: null,
      empNo: '',
      age: '',
      mobileNumber: null,
      email: ['', [Validators.email]],
      visanumber: '',
      rpnumber: '',
      bankaccno: '',
      arrivaldate: '',
      dateofbirth: '', 
      CompanyBranchId: '',
      NationalityId: '',
      arfname: null,
      armdlname: '',
      arlastname: '',
      ismgr: false,
      dutyresumedate: '',
      image: ''
    });
  } 
  
  get f() { return this.empmasterForm.controls; }
  SaveEmpInfoDetails(): void {
  this.submitted = true;
  console.log("submitted",this.submitted)
  console.log("empmasterForm",this.empmasterForm.value)
    // if (this.gender.nativeElement.value == '') {
    //    return
    //   }
      if (this.country.nativeElement.value == '0'||this.country.nativeElement.value == '') {
        alert('Please provide Country')
        const el = document.getElementById('CountryError');
      // if (el?.style.display === 'none')
      // {
      //   el?.style.display === 'block';
      // }
      // this.erroralert = 
        el?.style.display === 'none'
        // el?.style.display = 'block';
        // el?.style.display = 'block';
        return
       }
       if (this.desg.nativeElement.value == '0'||this.desg.nativeElement.value == '') {
        alert('Please provide Designation')
        
        return
       }
       if (this.dept.nativeElement.value == '0'||this.dept.nativeElement.value == '') {
        alert('Please provide Deparatment')
        
        return
       }
       if (this.category.nativeElement.value == '0'||this.category.nativeElement.value == '') {
        alert('Please provide Category')
        
        return
       }
       if (this.sec.nativeElement.value == '0'||this.sec.nativeElement.value == '') {
        alert('Please provide Section')
        
        return
       }
       if (this.gender.nativeElement.value == '0'||this.gender.nativeElement.value == '') {
        alert('Please provide Gender')
        
        return
       }

    if (this.empmasterForm.invalid) {
      return
    }
    if (this.EmpId > 0) {
      const data = {
        Id: this.EmpId,
        EmpNo: this.empMaster.code,
        JoiningDate: this.empMaster.joiningDate,
        FirstName: this.empMaster.firstName,
        SecondName: this.empMaster.secondName,
        LastName: this.empMaster.lastName ,
        FirstNameAr: this.empMaster.firstNameAr ,
        SecondNameAr: this.empMaster.secondNameAr ,
        LastNameAr: this.empMaster.lastNameAr ,
        DateOfBirth: this.empMaster.dateofbirth,
        Gender: this.gender.nativeElement.value,
        MobileNumber: this.empMaster.mobileNumber,
        Email: this.empMaster.email,
        VisaNo: this.empMaster.visanumber ,
        ArrivalDate: this.empMaster.dateofarrival,
        //RPNumber: this.empMaster.rpnumber, 
        BankAccntNo: this.empMaster.bankAccntNo ,
        DesignationId: this.desg.nativeElement.value,
        SectionId: this.sec.nativeElement.value,
        DepartmentId: this.dept.nativeElement.value,
        CompanyBranchId: this.cbranch.nativeElement.value,
        GradeId: this.grade.nativeElement.value || 1,
        BankBranchId: this.bank.nativeElement.value,
        CountryId: this.country.nativeElement.value,
        // CountryId:this.empmasterForm.controls[""].setValue(this.country),
        // CountryId:this.empmasterForm.controls.(this.country),
        SponsorId: this.sponsor.nativeElement.value,
        ManagerId: this.repmgr.nativeElement.value,
        SalaryCategoryID: this.category.nativeElement.value,
        NationalityId: this.natlist.nativeElement.value,
        IsManager: this.empMaster.ismanager
      };
      this.empService.update(this.EmpId, this.Flag1, data )
        .subscribe({ 
          next:(res) =>{
            this.updatealert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/EmployeeMaster', data.Id]);
          },
          error: (e) => {
            console.error(e);
            this.erroralert = true;
          }
        });
    }
    else {
      const data = {
        JoiningDate: this.empMaster.joiningDate || null,
        FirstName: this.empMaster.firstName || null,
        SecondName: this.empMaster.secondName || null,
        LastName: this.empMaster.lastName || null,
        FirstNameAr: this.empMaster.firstNameAr || null,
        SecondNameAr: this.empMaster.secondNameAr || null,
        LastNameAr: this.empMaster.lastNameAr || null,
        DateOfBirth: this.empMaster.dateofbirth || null,
        Gender: this.selectedGender,
        MobileNumber: this.empMaster.mobileNumber || null,
        Email: this.empMaster.email || null,
        VisaNo: this.empMaster.visanumber || null,
        ArrivalDate: this.empMaster.dateofarrival || null,
        LastDutyDate: this.empMaster.lastdutydate || null,
        LevDate: this.empMaster.leavingdate || null,
        BankAccntNo: this.empMaster.bankAccntNo || null,

        DesignationId: this.selectedDesignation,
        SectionId: this.selectedSection,
        DepartmentId: this.selectedDept,
        CompanyBranchId: this.selectedCBranch || null,
        GradeId: this.selectedGrade,
        BankBranchId: this.selectedBank || null,
        CountryId: this.selectedCountry,
        SponsorId: this.selectedSponsor || null,
        ManagerId: this.selectedRepMgr || null,
        SalaryCategoryID: this.selectedCategory,
        NationalityId: this.selectedNational || null,
        IsManager: this.empMaster.ismanager || false,
        Status:"0"
      };
      this.empService.create(data)
        .subscribe({
          next: (res) => {
            debugger
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
   
  BindEditEmployee() { 
    this.empService.get(this.EmpId).subscribe((data) => { 
      var toReturnImage = data.document;
      this.base64code = toReturnImage;
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64code);
      const pipe = new DatePipe('en-US');
      var dob = new Date(data.dateOfBirth);
      var DOB = this.datePipe.transform(dob,'yyyy-MM-dd');
      var arvl = new Date(data.arrivalDate);
      var ARVL = this.datePipe.transform(arvl,'yyyy-MM-dd');
      var doj = new Date(data.joiningDate);
      var DOJ = this.datePipe.transform(doj,'yyyy-MM-dd');
      var dop = new Date(data.dateOfPassage);
      var DOP = this.datePipe.transform(dop,'yyyy-MM-dd');
      let timeDiff = Math.abs(Date.now() - dob.getTime());
      let ageCalc = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25); 
      this.statusColor = data.status;
 
      this.empMaster = {
        code: data.empNo,
        joiningDate: DOJ,
        status: data.status,
        age: ageCalc,
        deptName: data.empDepartment,
        desigName: data.empDesignation,
        firstName: data.firstName,
        secondName: data.secondName,
        lastName: data.lastName,
        firstNameAr: data.firstNameAr,
        secondNameAr: data.secondNameAr,
        lastNameAr: data.lastNameAr,
        dateofbirth: DOB,
        gender: data.gender.toString(),
        mobileNumber: data.mobileNumber,
        email: data.email,    
        visanumber: data.visaNo,
        countryId: data.countryId,
        nationalityId: data.nationalityId,
        companyBranchId: data.companyBranchId,
        sponsorId: data.sponsorId,
        departmentId: data.departmentId,
        sectionId: data.sectionId,
        gradeId: data.gradeId,
        designationId: data.designationId,
        ismanager: data.isManager,
        RPNumber: data.rpnumber,
        dateofarrival: ARVL,
        dateOfPassage: DOP,
        LastDutyDate: data.lastdutydate,
        leavingdate: data.leavingDate,
        bankAccntNo: data.bankAccntNo,
        managerId: data.managerId,
        salaryCategoryId: data.salaryCategoryId,
        bankBranchId: data.bankBranchId,
      };
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
  NationalitylistBind(): void {
    this.comService.getNationality()
      .subscribe({
        next: (data) => {
          this.Nationalitylist = data;
          console.log(data);
        },
        error: (e) => console.error(e)
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
  CompanyListBind(): void {
    this.comService.getCompany()
      .subscribe({
        next: (data) => {
          this.CompanyList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  CompanyBranchListBind(): void {
    this.comService.getCbranch()
      .subscribe({
        next: (data) => {
          this.CbranchList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  ManagerListBind(): void {
    this.comService.getManager()
      .subscribe({
        next: (data) => {
          this.ManagerList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  GradeListBind(): void {
    this.comService.getGradeList()
      .subscribe({
        next: (data) => {
          this.GradeList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  BankListBind(): void {
    this.comService.getBankList()
      .subscribe({
        next: (data) => {
          this.BankList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  CategoryListBind(): void {
    this.comService.getSalaryCategory()
      .subscribe({
        next: (data) => {
          this.CategoryList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  SponsorListBind(): void {
    this.comService.getSponsorList()
      .subscribe({
        next: (data) => {
          this.SponsorList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  DesignationListBind(): void {
    this.desigService.getDesignationList()
      .subscribe({
        next: (data) => {
          this.DesignationList = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  SectionListBind(): void {
    this.secService.getSecstionList()
      .subscribe({
        next: (data) => {
          this.SectionList = data;
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

  public handleError = (controlName: string, errorName: string) => {
    return this.empmasterForm.controls[controlName].hasError(errorName);
  };

  closeAlert() { this.alert = false; }
  closeErrorAlert() { this.erroralert = false; }
  closeUpdateAlert() { this.updatealert = false; }
}
