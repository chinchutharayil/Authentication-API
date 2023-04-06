import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { DepartmentModel } from '../../models/setup-pages.model'; 

const baseUrl = 'https://localhost:7092/api/Departments';
const CommonAPIURL = 'https://localhost:7092/api/CommonDropdownAPI/Department';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  httpClient: any;

  constructor(private http: HttpClient) { }
  getDeptList(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(CommonAPIURL);
  }
  getAll(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(baseUrl);
  }

  get(id: any): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  findByTitle(name?: any, sorder?: any): Observable<DepartmentModel[]> { 
    return this.http.get<DepartmentModel[]>(`${baseUrl}/${name}/${sorder}`);
  } 
}
