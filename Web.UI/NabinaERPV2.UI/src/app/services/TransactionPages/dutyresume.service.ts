import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DutyResumeModel } from 'src/app/models/transaction-pages.model';

const baseUrl = 'https://localhost:7092/api/DutyResumes';

@Injectable({
  providedIn: 'root'
})
export class DutyresumeService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<DutyResumeModel[]> {
    return this.http.get<DutyResumeModel[]>(baseUrl);
  }

  get(id: any): Observable<DutyResumeModel> {
    return this.http.get<DutyResumeModel>(`${baseUrl}/${id}`);
  }  

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  findDutyResume(empName?: any, empNo?: any, leaveFrom?: any, leaveTo?: any, rpNo?: any, natId?: any, status?:any): Observable<DutyResumeModel[]> {
    return this.http.get<DutyResumeModel[]>(`${baseUrl}/${empName}/${empNo}/${leaveFrom}/${leaveTo}/${rpNo}/${natId}/${status}`);
  }

}
