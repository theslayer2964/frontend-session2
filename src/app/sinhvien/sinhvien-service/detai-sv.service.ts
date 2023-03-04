import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {DeTai} from "../../giangvien/detai/DeTai.models";

@Injectable({
  providedIn: 'root'
})
export class DetaiSvService {
  private url = "http://localhost:8080/api/giang-vien/lay-ds-de-tai-theo-nam-hk/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
  }

  postDeTai(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url, data, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
    ;
  }

  getDeTaiRoleGV(hocKy: any): Observable<DeTai[]> {
    return this.httpClient.get<DeTai[]>(this.url + hocKy, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  updateDeTai(data: any, id: any): Observable<any> {
    return this.httpClient.put<any>(this.url + id, data, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  deleteDeTai(id: any) {
    return this.httpClient.delete<any>(this.url + id, {headers: this.httpHeadersJWT});
  }

  getNhomRoleGV(hocKy: any) {
    return this.httpClient.post<any>(this.url, hocKy, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
    ;
  }
}
