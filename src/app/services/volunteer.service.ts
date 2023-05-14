import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  rootApiUrl: string = 'https://apiurl';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    }),
    withCredentials: false
  }

  constructor(private http: HttpClient) { }

  saveVolunteerData(details: any): Observable<number[]>{
    return this.http.post<number[]>(this.rootApiUrl + '/GetUserCalendarGroups', {details: details}, this.httpOptions);
  }
}
