import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SinhvienService {
  private url = "http://localhost:8080/api/";
  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }
  // getDSSinhVien(data: any): Observable<any>{
  //   return this.httpClient.get
  // }
}
