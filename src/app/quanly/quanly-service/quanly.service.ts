import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {catchError, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuanlyService {
  private urlPhieuCham = "http://localhost:8080/api/phieu-cham/";

  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  chamDiem(bangDiem: any){
    return this.httpClient.post<HocKy[]>(this.urlPhieuCham + "cham-diem", bangDiem, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
  }

}
