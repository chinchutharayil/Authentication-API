import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';

const baseUrl = 'https://localhost:7092/api/Employees';
const CommonAPIURLSP = 'https://localhost:7092/api/EmployeeAPI/Getallemployees';
const EmployeeAPIServ = 'https://localhost:7092/api/EmployeeAPI/GetAllEmployeesById';
const Saveempdetails= 'https://localhost:7092/api/EmployeeAPI/';

 
@Injectable({
  providedIn: 'root'
})
export class EmployeeSearchService { 
   Braid=null;
  constructor(private http: HttpClient) { }

  getAll(BraId : any): Observable<EmployeeModel[]> {
    
    return this.http.get<EmployeeModel[]>(`${CommonAPIURLSP}/${BraId}`);
   }
  // getAll(): Observable<EmployeeModel[]> {
    
  //   return this.http.get<EmployeeModel[]>(baseUrl);
  // }

  // get(id: any): Observable<EmployeeModel> {
  //   return this.http.get<EmployeeModel>(`${baseUrl}/${id}`);
  // }
  //Akhil
   get(id: any): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${EmployeeAPIServ}/${id}`);
  }
  // getUserById(userId:number):Observable<any>{
  //   return this.httpservice.get(this.baseURLAPI+"/users/"+userId);
  // } 
  create(data: any): Observable<any> {
    return this.http.post(Saveempdetails, data);
  }

  update(id: any, Flag:any, data: any ): Observable<any> {
    return this.http.put(`${baseUrl}/${id}/${Flag}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByEmployee(empName?: any, empNo?: any, deptId?: any, desgId?: any, sponsorId?: any, natId?: any, status?: any): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${baseUrl}/${empName}/${empNo}/${deptId}/${desgId}/${sponsorId}/${natId}/${status}`);
  }
 
} 
