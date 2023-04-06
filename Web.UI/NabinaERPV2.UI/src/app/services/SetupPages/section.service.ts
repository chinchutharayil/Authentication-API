import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SectionModel } from '../../models/setup-pages.model';

const baseUrl = 'https://localhost:7092/api/Sections';
const CommonAPIURL = 'https://localhost:7092/api/CommonDropdownAPI/SectionModel';
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }
 
  getAll(): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(baseUrl);
  }
  getSecstionList(): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(CommonAPIURL);
  }

  get(id: any): Observable<SectionModel> {
    return this.http.get<SectionModel>(`${baseUrl}/${id}`);
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
  findByTitle(name?: any, sorder?: any): Observable<SectionModel[]> {
    return this.http.get<SectionModel[]>(`${baseUrl}/${name}/${sorder}`);
  }
}