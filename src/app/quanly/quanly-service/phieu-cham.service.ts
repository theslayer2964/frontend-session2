import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {catchError, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhieuChamService {
  private urlPhieuCham = "http://localhost:8080/api/phieu-cham/";

  private urlQuanLy = "http://localhost:8080/api/quan-ly/";

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

  layDsSvDaCham(maGV: string){
    return this.httpClient.get<any>(this.urlPhieuCham + "lay/"+ maGV, {headers: this.httpHeadersJWT})
        .pipe(
            tap(res => res),
            catchError(err => of([])));
  }

  layDsSvDaChamDiemCuThe(data: any){
    return this.httpClient.post<any>(this.urlPhieuCham + "lay-cu-the", data, {headers: this.httpHeadersJWT})
        .pipe(
            tap(res => res),
            catchError(err => of([])));
  }

  chamDiemBao(data: any){
    return this.httpClient.put(this.urlPhieuCham + "them-diem-bao", data, {headers: this.httpHeadersJWT});
  }
  getPhieuChamWord(data: any): any{
    let headers = this.httpHeadersJWT;
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
    return this.httpClient.get(this.urlPhieuCham + "xuat-phieu-cham-gv" , {
      headers: headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }
}
