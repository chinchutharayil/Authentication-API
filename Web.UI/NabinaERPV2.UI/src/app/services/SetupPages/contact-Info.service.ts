import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInfoModel } from '../../models/employee.model';

const ContactsbaseUrl = 'https://localhost:7092/api/EmployeeContacts'
const contactUrl = 'https://localhost:7092/api/EmployeeContacts/GetContact';


@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ContactInfoModel[]> {
    return this.http.get<ContactInfoModel[]>(ContactsbaseUrl);
  }

  get(id: any): Observable<ContactInfoModel[]> {
    return this.http.get<ContactInfoModel[]>(`${ContactsbaseUrl}/${id}`);
  }

  getById(id: any): Observable<ContactInfoModel> {
    return this.http.get<ContactInfoModel>(`${contactUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(ContactsbaseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${ContactsbaseUrl}/${id}`, data);
  }
}


