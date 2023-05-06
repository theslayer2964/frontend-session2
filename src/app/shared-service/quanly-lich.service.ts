import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";
import {HocKy} from "./HocKy.models";

@Injectable({
  providedIn: 'root'
})
export class QuanlyLichService {
  private url = "http://localhost:8080/api/quan-ly/";

  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  themDSPhanCong(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.url + "them-ds-phan-cong", data, {headers: this.httpHeadersJWT});
  }
}
