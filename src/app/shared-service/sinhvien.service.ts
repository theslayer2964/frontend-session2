import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SinhvienService {
  private url = "http://localhost:8080/api/sinhvien/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }
  // getDSSinhVien(data: any): Observable<any>{
  //   return this.httpClient.get
  // }

  addSinhVienExcel(file: any, maGV: string) {
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(this.url + "them-de-tai-excel/" + maGV, formData,{headers: {
        'Accept':'application/json',
        Authorization: `Bearer ${(this.token)}`
      }} ).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
    ;
  }

}
