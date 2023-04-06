import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { LeaveRequestModel } from 'src/app/models/transaction-pages.model';

const baseUrl = 'https://localhost:7092/api/VacationRequests';
const allLeaveUrl = 'https://localhost:7092/api/VacationRequests';


@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  BraId=null;
  constructor(private http: HttpClient) { }

  getAll(BraId : any): Observable<LeaveRequestModel[]> {
    
    return this.http.get<LeaveRequestModel[]>(`${allLeaveUrl}/${BraId}`);
  }
  // getAll(BraId : any): Observable<LeaveRequestModel[]> {
  //   return this.http.get<LeaveRequestModel[]>(baseUrl);
  // }

  get(id: any): Observable<LeaveRequestModel> {
    return this.http.get<LeaveRequestModel>(`${baseUrl}/${id}`);
  }  

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  findLeaveRequest(empName?: any, empNo?: any, leaveFrom?: any, leaveTo?: any, rpNo?: any, natId?: any, status?:any): Observable<LeaveRequestModel[]> {
    return this.http.get<LeaveRequestModel[]>(`${baseUrl}/${empName}/${empNo}/${leaveFrom}/${leaveTo}/${rpNo}/${natId}/${status}`);
  } 
 
}
