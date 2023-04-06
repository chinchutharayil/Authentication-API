import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppraisalHistoryModel, LeaveHistoryModel, SalaryHistoryModel } from '../../models/employee.model';

const baseUrlforSal = 'https://localhost:7092/api/SalaryInformationReport';
const baseUrlforLev = 'https://localhost:7092/api/EmployeeLeaveHistory';
const baseUrlforApp = 'https://localhost:7092/api/Appraisals';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeReportsService {

  constructor(private http:HttpClient) { }
  
  getSalaryHistory(id:any, from?:any, to?:any):Observable<SalaryHistoryModel[]>{
    return this.http.get<SalaryHistoryModel[]>(`${baseUrlforSal}/${id}/${from}/${to}`);
  }    
  getLeaveHistory(id:any, from?:any, to?:any): Observable<LeaveHistoryModel[]> {
    return this.http.get<LeaveHistoryModel[]>(`${baseUrlforLev}/${id}/${from}/${to}`);
  } 

  getAppraisalHistory(id: any, from?:any, to?:any): Observable<AppraisalHistoryModel[]> {
    return this.http.get<AppraisalHistoryModel[]>(`${baseUrlforApp}/${id}/${from}/${to}`);
  } 
}
