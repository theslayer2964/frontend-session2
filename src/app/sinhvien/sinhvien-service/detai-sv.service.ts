import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {DeTai} from "../../giangvien/detai/DeTai.models";
import {logger} from "codelyzer/util/logger";

@Injectable({
  providedIn: 'root'
})
export class DetaiSvService {
  private url = "http://localhost:8080/api/de-tai/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
  }

  dangKyDeTai(data: any){
    return this.httpClient.post(this.url + 'dang-ky-de-tai', data, {headers: this.httpHeadersJWT});
        // .pipe(
        // tap(recieveDeTai => recieveDeTai), catchError(err => throwError(err) ));
  }

  xemDeTaiCanDangKy(data: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.url + 'xem-de-tai-da-duyet', data,{headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of(err)));
  }


}
