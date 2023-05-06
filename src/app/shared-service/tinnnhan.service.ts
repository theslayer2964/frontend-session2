import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {HocKy} from "./HocKy.models";

@Injectable({
  providedIn: 'root'
})
export class TinnhanService {
  private url = "http://localhost:8080/api/tin-nhan/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }


  layTinNhan(data: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "lay-tin-nhan/" + data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  docTinNhan(data: any): Observable<any[]> {
    return this.httpClient.put<any[]>(this.url + "da-doc-tin-nhan", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  layTinNhanChuaDoc(data: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "lay-tin-nhan-chua-doc/" + data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }


}
