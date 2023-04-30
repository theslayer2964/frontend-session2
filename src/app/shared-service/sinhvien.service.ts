import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {HocKy} from "./HocKy.models";

@Injectable({
  providedIn: 'root'
})
export class SinhvienService {
  private urlSinhVien = "http://localhost:8080/api/sinh-vien/";
  private urlQuanLy = "http://localhost:8080/api/quan-ly/";

  private  urlGiangVien = "http://localhost:8080/api/giang-vien/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  addSinhVienExcel(file: any, maGV: string) {
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(this.urlSinhVien + "them-sinh-vien-excel/", formData,{headers: {
        'Accept':'application/json',
        Authorization: `Bearer ${(this.token)}`
      }} ).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
    ;
  }


  themSinhVien(data: any): Observable<any[]> {
    return this.httpClient.post<HocKy[]>(this.urlSinhVien + "them-sinh-vien", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  themGiangVien(data: any): Observable<any[]> {
    return this.httpClient.post<HocKy[]>(this.urlGiangVien + "them-giang-vien", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  layDsSinhVien(data: any): Observable<any[]> {
    return this.httpClient.post<HocKy[]>(this.urlQuanLy + "lay-ds-sinh-vien", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }
}
