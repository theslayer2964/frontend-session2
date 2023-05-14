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

  addSinhVienExcel(file: any) {
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(this.urlSinhVien + "them-sinh-vien-excel/", formData,{headers: {
        'Accept':'application/json',
        Authorization: `Bearer ${(this.token)}`
      }})
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

  lyaDsSinhVienLop(data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.urlSinhVien + "lay-sinh-vien-lop", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  xuatDsSinhVienLopHocPhan(data: any): any {
    let headers = this.httpHeadersJWT;
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
    return this.httpClient.post(this.urlQuanLy + "xuat-ds-sinhvien" ,data, {
      headers: headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }

  xuatfileMauSV(): any {
    let headers = this.httpHeadersJWT;
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
    return this.httpClient.get(this.urlQuanLy + "xuat-file-mau-sv" ,{
      headers: headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }

  getDiemSV(maSV: any){
    return this.httpClient.get(this.urlSinhVien + "lay-ket-qua/" + maSV,{headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

}
