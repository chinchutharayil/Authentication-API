import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesignationModel } from '../../models/setup-pages.model';

const baseUrl = 'https://localhost:7092/api/Designations';
const CommonAPIURL = 'https://localhost:7092/api/CommonDropdownAPI/Designation';


@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http: HttpClient) { }
  getDesignationList(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(CommonAPIURL);
  }
  getAll(): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(baseUrl);
  }

  get(id: any): Observable<DesignationModel> {
    return this.http.get<DesignationModel>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByDesignation(name?: any, sorder?:any): Observable<DesignationModel[]> {
    return this.http.get<DesignationModel[]>(`${baseUrl}/${name}/${sorder}`);
  } 
}

// export class DepartmentService{

//   constructor(private http: HttpClient) { }

//   getDesignationList(): Observable<Department[]> {
//     return this.http.get<Department[]>(CommonAPIURL);
//   }
  
//   getAll(): Observable<Department[]> {
//     return this.http.get<Department[]>(baseUrl);
//   }

// }