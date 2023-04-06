import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonHRService } from 'src/app/services/commonHR.service'; 
import { EmployeOfficalDocsModel } from 'src/app/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeSearchService } from 'src/app/services/SetupPages/employee.service';
import { OfficialDocumentsService } from 'src/app/services/SetupPages/official-documents.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscriber } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-official-documents',
  templateUrl: './official-documents.component.html',
  styleUrls: ['./official-documents.component.css']
})
export class OfficialDocumentsComponent implements OnInit {
  selectedFile: any;
  //  selectedFile: Observable<any>;
  fileName: any;
  EmpId: number = 0;
  DocId: number = 0;
  documentsForm!: FormGroup
  OfficialDocs: any;
  base64code!: any;
  // myImage !: Observable<any>;
  myImage!: any;
  alert: boolean = false;
  erroralert: boolean = false;
  updatealert:boolean = false;

  submitted = false;
  offDocs?: EmployeOfficalDocsModel[];

  EmployeOfficalDocsModel: EmployeOfficalDocsModel = {
    name: '',
    isActive: false,
    empid: '',
    issueDate: '',
    expiryDate: '',
    remarks: ''
  };

  @ViewChild(MatTable) table!: MatTable<EmployeOfficalDocsModel>;
  @ViewChild('docs') docs!: ElementRef;
  selectedDocs = '';
  onSelectedofficialDocuments(): void {
    this.selectedDocs = this.docs.nativeElement.value;
  }

  empDocuments: any = {
    id: 0,
    docId: 0
  };
  empMaster: any = {
    id: 0,
  };

  displayedColumns: string[] = ['action', 'docType', 'documentNumber', 'issueDate', 'expiryDate', 'remarks', 'status'];
  dataSource: any;

  constructor(private http: HttpClient, private comService: CommonHRService, private _sanitizer: DomSanitizer, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private DocsService: OfficialDocumentsService) { }

  ngOnInit(): void {
    this.EmpId = +this.route.snapshot.params['id'];
    this.OfficialDocsListBind();
    this.BindOfficialDocs();

    this.documentsForm = this.formBuilder.group({ 
      officialDocumentId:['', Validators.required],
      documentNumber: '',
      issuedate: '',
      expirydate:'',
      remarks: '',
      isactive: true,
      document: '',
      myImage: ''
    });
  }

  OfficialDocsListBind(): void {
    this.comService.getOfficialDocuments()
      .subscribe({
        next: (data) => {
          this.OfficialDocs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  get f() { return this.documentsForm.controls; }

  SaveEmpOfficalDocs(): void {
    this.submitted = true;
    if (this.documentsForm.invalid) {
      return
    }
    if (this.DocId > 0) {
      const data = {
        Id: this.DocId,
        EmployeeId: this.EmpId,
        IssueDate: this.empDocuments.issueDate,
        OfficialDocumentID: this.docs.nativeElement.value,
        DocumentNumber: this.empDocuments.documentNumber,
        Document: "",
        ExpiryDate: this.empDocuments.expiryDate,
        Remarks: this.empDocuments.remarks,
        IsActive: this.empDocuments.isactive
      };
      this.DocsService.update(this.DocId, data)
        .subscribe({
          next:(res) =>{
            this.updatealert= true;
            console.log(res);
            this.submitted =true;
            this.router.navigate(['/EmployeeMaster', data.EmployeeId]);
            this.BindOfficialDocs();
           // this.documentsForm.reset();
          },
          error:(e) => {
            this.erroralert = true;
            console.error(e);
          }
        });  
    }
    else {
      // const filedata = new FormData();
      // filedata.append('image' , this.selectedFile , this.selectedFile.name)
      const data = {
        EmployeeId: this.EmpId,
        IssueDate: this.empDocuments.issueDate,
        OfficialDocumentID: this.docs.nativeElement.value,
        DocumentNumber: this.empDocuments.documentNumber,
        Document: "",
        ExpiryDate: this.empDocuments.expiryDate,
        Remarks: this.empDocuments.remarks,
        IsActive: this.empDocuments.isactive
      };  
      // this.DocsService.create(data,filedata)
      this.DocsService.create(data)
        .subscribe({
          next: (res) => {
            this.alert = true;
            console.log(res);
            this.submitted = true;
            this.router.navigate(['/EmployeeMaster', res.employeeId]);
            this.BindOfficialDocs();
          //  this.documentsForm.reset();
            
          },
          error: (e) => {
            console.error(e);
           this.erroralert = true;
          }
        });
    }
  }

  BindOfficialDocsForm(id: any): void {
    this.DocId = id;
    this.DocsService.getById(id).subscribe((data) => {
      console.log(data);
      var toReturnImage = data.document;
      this.base64code = toReturnImage;
      this.myImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64code);


      const pipe = new DatePipe('en-US');
      // if(data.issueDate != null)
      // {
        var issueDate = new Date(data.issueDate);
        var DOI = this.datePipe.transform(issueDate, 'yyyy-MM-dd');
      // }
    //  if(data.expiryDate != null)
    //  {
      var expDate = new Date(data.expiryDate);
      var DOE = this.datePipe.transform(expDate, 'yyyy-MM-dd');
      
    //  }
     

      this.empDocuments = {
        officialDocumentId: data.officialDocumentId,
        documentNumber: data.documentNumber,
        issueDate: DOI,
        expiryDate: DOE,
        remarks: data.remarks,
        isactive : data.isActive
      }
    });
  }

  BindOfficialDocs(): void { 
    this.DocsService.get(this.EmpId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.offDocs = data;
          this.dataSource = new MatTableDataSource<EmployeOfficalDocsModel>(this.offDocs);
        },
        error: (e) => console.error(e)
      });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.documentsForm.controls[controlName].hasError(errorName);
  };

  // onChange = ($event: Event) => { 
  //   const target = $event.target as HTMLInputElement;
  //   const file: File = (target.files as FileList)[0];
  //   console.log(file)
  //   this.convertToBase64(file)
  // }

  convertToBase64(file: File) { 
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {
      console.log(d);
      this.empDocuments.document = d;
      this.myImage = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) { 
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  }

  onChange = ($event: Event) => {
    const data = {
      EmployeeId: this.EmpId,
      OfficialDocumentID: this.docs.nativeElement.value,
    };
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = (target.files as FileList)[0];
    console.log(file)
    const filedata = new FormData();
    filedata.append('image', this.selectedFile, this.selectedFile.name)
    //this.DocsService.uploaddoc(data,filedata)
    this.http.post('https://localhost:7092/api/FileUpload', filedata)
      .subscribe(res => {
        console.log(res);
      })
  }

  // uploadFiles()
  // {
  //   debugger
  //   const filedata = new FormData();
  //   filedata.append('image' , this.selectedFile , this.selectedFile.name)
  //   this.http.post('https://localhost:7092/api/EmployeeOfficialDocuments',filedata)
  //   .subscribe(res => {
  //     console.log(res);
  //   }) 
  // }
}

