import { Injectable } from '@angular/core';
import {catchError, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private url = "http://localhost:8080/api/sinhvien/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }

  addGiangVienExcel(file: any, maQL: string) {
    var formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post<any>(this.url + "them-giang-vien-excel/" + maQL, formData,{headers: {
        'Accept':'application/json',
        Authorization: `Bearer ${(this.token)}`
      }} ).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));
    ;
  }
}
