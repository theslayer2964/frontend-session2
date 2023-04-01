import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {DeTai} from "../giangvien/detai/DeTai.models";
import {HocKy} from "./HocKy.models";
import {UserAuthService} from "../authentication/_service/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class HockyService {
  private url = "http://localhost:8080/api/giang-vien/lay-nam-hoc-ky";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
  }

  postHocKy(data: any): Observable<any>{
    return this.httpClient.post<any>(this.url, data, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));;
  }

  getHocKy(): Observable<HocKy[]> {
    return this.httpClient.get<HocKy[]>(this.url,{headers: this.httpHeadersJWT})
        .pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  updateHocKy(data: any, id: any): Observable<any> {
    return this.httpClient.put<any>(this.url + id, data, {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  deleteHocKy(id: any) {
    return this.httpClient.delete<any>(this.url + id, {headers: this.httpHeadersJWT});
  }
}
