import { Injectable } from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private url = "http://localhost:8080/api/giang-vien/";

  private urlQuanLy = "http://localhost:8080/api/quan-ly/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }

  addGiangVienExcel(file: any, maQL: string) {
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(this.urlQuanLy + "them-giang-vien-excel/", formData,{headers: {
        'Accept':'application/json',
        Authorization: `Bearer ${(this.token)}`
      }} ).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
  }

  getDSGV(){
    return this.httpClient.get<any>(this.urlQuanLy + "lay-ds-giang-vien", {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  phanCongGV(formData: any){
    return this.httpClient.post<any>(this.urlQuanLy + "them-phan-cong", formData,{headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    ;
  }

  getGiangVien() {
        return this.httpClient.get<any>(this.urlQuanLy + "lay-ds-giang-vien" , {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
  }
}
