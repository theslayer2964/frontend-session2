import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {catchError, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {
  private urlGV = "http://localhost:8080/api/nhom/";

  token: string = this.userAuthService.getToken();
  private httpHeadersJWT = new HttpHeaders({
    Authorization: `Bearer ${(this.token)}`
  })

  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) { }

  getDSSVTheoHKVaVaiTro(maHocKy: string, vaiTro: string, maNguoiDung: string){
    return this.httpClient.post<any>(this.urlGV + "lay-ds-nhom-theo-vai-tro",{
      "maHocKy":maHocKy,
      "vaiTro":vaiTro,
      "maNguoiDung":maNguoiDung
    } ,{headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDSDeTai => recieveDSDeTai),
            catchError(err => of([])));
  }

  chamdiemChoSV(formData: FormData){
    return this.httpClient.post<any>(this.urlGV + "/",formData, {headers: this.httpHeadersJWT})
        .pipe(
            tap(recieveDSDeTai => recieveDSDeTai),
            catchError(err => of([])));
  }
}
