import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class TechnicalService {

  private apiUrl = '/assets/db.json'; 

  constructor(private http: HttpClient) {}

  getAllTableData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res: any) => {
        let response =res['table_datas'];
        return response;
      })
    );;
  }

  getProjectDetail(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res: any) => {
        let response =res['project_detail'];
        return response;
      })
    );;
  }

}
