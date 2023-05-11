import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {FileGeneratorService} from "./file-generator.service";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LopHocPhanService {

  private url = "http://localhost:8080/api/lop-hoc-phan/";

  private urlQuanLy = "http://localhost:8080/api/quan-ly/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService, private filegeneate: FileGeneratorService) {

  }

  layDsLop(): Observable<any> {
    return this.httpClient.get<any>(this.url + "lay-ds", {headers: this.httpHeadersJWT});
  }


  taoLopHocPhan(data: any) {
    return this.httpClient.post<any>(this.url + "them", data, {headers: this.httpHeadersJWT}).pipe(
        tap(receiveNhom => receiveNhom),
        catchError(err => of([])));
  }

  xoa(data: any) {
    return this.httpClient.post<any>(this.url + "them", data, {headers: this.httpHeadersJWT}).pipe(
        tap(receiveNhom => receiveNhom),
        catchError(err => of([])));
  }

  sua(data: any) {
    return this.httpClient.post<any>(this.url + "them", data, {headers: this.httpHeadersJWT}).pipe(
        tap(receiveNhom => receiveNhom),
        catchError(err => of([])));
  }

  layPhong() {
    return this.httpClient.get<any>(this.url + "lay-phong", {headers: this.httpHeadersJWT}).pipe(
        tap(receiveNhom => receiveNhom),
        catchError(err => of([])));
  }


}
