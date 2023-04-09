import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {DeTai} from "../../giangvien/detai/DeTai.models";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Nhom} from "../Nhom.models";

@Injectable({
  providedIn: 'root'
})
export class NhomSvService {
  private url = "http://localhost:8080/api/nhom/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) {
  }

  // postDeTai(data: any): Observable<any>{
  //   return this.httpClient.post<any>(this.url, data, this.httpOptions).pipe(
  //       tap(recieveDeTai => recieveDeTai),
  //       catchError(err => of([])));
  // }

  getNhomSV(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  // updateDeTai(data: any, id: any): Observable<any> {
  //   return this.httpClient.put<any>(this.url + id, data, this.httpOptions).pipe(
  //       tap(recieveDeTai => recieveDeTai),
  //       catchError(err => of([])));
  // }

  // deleteDeTai(id: any) {
  //   return this.httpClient.delete<any>(this.url + id);
  // }
}
