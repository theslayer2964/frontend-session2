import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {HocKy} from "./HocKy.models";

@Injectable({
  providedIn: 'root'
})
export class TieuchichamdiemService {
  private url = "http://localhost:8080/api/tieu-chi-cham-diem/";

  private urlPhieuMau = "http://localhost:8080/api/phieu-mau/";

  private urlQuanLy = "http://localhost:8080/api/quan-ly/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }

  themTieuChi(data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.url + "them", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  layHetTieuChi(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url + "lay-het", {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }
  themPhieuChamMau(data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.urlPhieuMau + "them", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

  layHetPhieuChamMau(data: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.urlPhieuMau + "lay-het/" + data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

}
