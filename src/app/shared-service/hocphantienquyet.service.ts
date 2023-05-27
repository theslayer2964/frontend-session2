import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HocphantienquyetService {

  private url = "http://localhost:8080/api/hoc-phan-tien-quyet/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
  }

  getAll(): Observable<any>{
    return this.httpClient.get<any>(this.url + "lay-het", {headers: this.httpHeadersJWT}).pipe(
        tap(recieveDeTai => recieveDeTai),
        catchError(err => of([])));;
  }
}
