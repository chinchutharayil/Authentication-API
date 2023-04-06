import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { EmployeOfficalDocsModel } from '../../models/employee.model';


const baseUrl = 'https://localhost:7092/api/EmployeeOfficialDocuments';
 
const docsUrl = 'https://localhost:7092/api/EmployeeOfficialDocuments/Getdocs';
const docsUrlfileupload = 'https://localhost:7092/api/FileUpload';

@Injectable({
  providedIn: 'root'
})
export class OfficialDocumentsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeOfficalDocsModel[]> {
    return this.http.get<EmployeOfficalDocsModel[]>(baseUrl);
  }

  getById(id: any): Observable<EmployeOfficalDocsModel> {
    return this.http.get<EmployeOfficalDocsModel>(`${docsUrl}/${id}`);
  } 
  get(id: any): Observable<EmployeOfficalDocsModel[]> {
    return this.http.get<EmployeOfficalDocsModel[]>(`${baseUrl}/${id}`);
  } 
  
  uploaddoc(data: any , filedata: any): Observable<any> {
    return this.http.post(docsUrlfileupload, data , filedata);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  // post(filedata: any): Observable<any> {
  //   return this.http.post(baseUrl, filedata);
  // }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
