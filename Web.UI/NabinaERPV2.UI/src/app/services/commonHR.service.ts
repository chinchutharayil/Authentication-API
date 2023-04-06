import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Grade,Sponsor,SalaryCategory,Bank,Unit, Company,CompanyBranch,Country,Nationality,Accomodation,DocsImages,OfficialDocuments, ContactType} from '../models/commonHR.model';
import {EmployeeModel} from '../models/employee.model';


const baseUrl = 'https://localhost:7092/api/Employees';
const CommonAPIURLSP = 'https://localhost:7092/api/CommonDropdownAPI/Sponser';
const CommonAPIURLGD = 'https://localhost:7092/api/CommonDropdownAPI/Grade';
const CommonAPIURL  = 'https://localhost:7092/api/CommonDropdownAPI/SalaryCategory';
const CommonAPIURLBank  = 'https://localhost:7092/api/CommonDropdownAPI/Bank';
const CommonAPIURLUnit  = 'https://localhost:7092/api/CommonDropdownAPI/Unit';
const CommonAPIURLCompany  = 'https://localhost:7092/api/CommonDropdownAPI/Comapny';
const CommonAPIURLIsManager  = 'https://localhost:7092/api/CommonDropdownAPI/IsManager';
const CommonAPIURLCBranch  = 'https://localhost:7092/api/CommonDropdownAPI/Cbranch';
const CommonAPIURLCountry  = 'https://localhost:7092/api/CommonDropdownAPI/Country';
const CommonAPIURLNationality  = 'https://localhost:7092/api/CommonDropdownAPI/Nationality';
const CommonAPIURLAccomodation  = 'https://localhost:7092/api/CommonDropdownAPI/Accomodation';
const CommonAPIURLOfficialDocuments  = 'https://localhost:7092/api/CommonDropdownAPI/OfficialDocuments';
const CommonAPIURLContactType  = 'https://localhost:7092/api/CommonDropdownAPI/ContactType'; 
const EmpPopupSearch = 'https://localhost:7092/api/Employees/EmployeePopupSearch';
// const EmpPopup = 'https://localhost:7092/api/Employees/EmployeePopup';
const baseUrlNew = 'https://localhost:7092/api/EmployeeAPI';

const EmployeeAPIServ = 'https://localhost:7092/api/EmployeeAPI/GetAllEmployeesById';
@Injectable({
  providedIn: 'root'
})
export class CommonHRService {

  constructor(private http: HttpClient) { }
  getBankList(): Observable<Bank[]> {
    return this.http.get<Bank[]>(CommonAPIURLBank);
  }
  getSponsorList(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(CommonAPIURLSP);
  }
  getGradeList(): Observable<Grade[]> {
    return this.http.get<Grade[]>(CommonAPIURLGD);
  }
  getSalaryCategory(): Observable<SalaryCategory[]> {
    return this.http.get<SalaryCategory[]>(CommonAPIURL);
  }
  getUnit(): Observable<Unit[]> {
    return this.http.get<Unit[]>(CommonAPIURLUnit);
  }
  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(CommonAPIURLCountry);
  }
  getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(CommonAPIURLCompany);
  }
  getManager(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(CommonAPIURLIsManager);
  }
  getCbranch(): Observable<CompanyBranch[]> {
    return this.http.get<CompanyBranch[]>(CommonAPIURLCBranch);
  }
  getNationality(): Observable<Nationality[]> {
    return this.http.get<Nationality[]>(CommonAPIURLNationality);
  }
  getAccomodation(): Observable<Accomodation[]> {
    return this.http.get<Accomodation[]>(CommonAPIURLAccomodation);
  }
  getOfficialDocuments(): Observable<OfficialDocuments[]> {
    return this.http.get<OfficialDocuments[]>(CommonAPIURLOfficialDocuments);
  }
  getContactType(): Observable<ContactType[]> {
    return this.http.get<ContactType[]>(CommonAPIURLContactType);
  }
  // getImages(id: any) : Observable<ListResponseModel<DocsImages>>{
  //   return this.http.get<ListResponseModel<DocsImages>>(`${baseUrl}/${id}`);
  // } 
  getHeaderDetails(id: any): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${EmployeeAPIServ}/${id}`);
  }

  // getEmployeePopup():Observable<EmployeeModel[]>{
  //   return this.http.get<EmployeeModel[]>(EmpPopup);
  // }

  empPopupSearch(empName?: any, empNo?: any, deptId?: any, desgId?: any, natId?: any, status?:any): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${EmpPopupSearch}/${empName}/${empNo}/${deptId}/${desgId}/${natId}/${status}`);
  } 
}