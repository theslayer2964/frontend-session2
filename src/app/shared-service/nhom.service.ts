import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {Nhom} from "../sinhvien/Nhom.models";

@Injectable({
    providedIn: 'root'
})
export class NhomService {
    private url = "http://localhost:8080/api/nhom/";
    token: string = this.userAuthService.getToken();
    private httpHeadersJWT = new HttpHeaders({
        Authorization: `Bearer ${(this.token)}`
    })

    constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
    }

    dangKyNhom(data: any): Observable<any> {
        return this.httpClient.post<any>(this.url + "dang-ky-nhom", data, {headers: this.httpHeadersJWT});
    }


    getNhomRoleGV(data: any) {
        return this.httpClient.post<any>(this.url + "lay-ds-nhom", data, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getNhomChuaDuyet() {
        return this.httpClient.get<any>(this.url + "lay-ds-nhom/" + 0, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getNhomSinhVien(maNhom: string) {
        return this.httpClient.get<any>(this.url + "lay-nhom/" + maNhom, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    roiNhom(data: any) {
        return this.httpClient.post<any>(this.url + "roi-nhom", data, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getDSNhomDePhanCongGVPhanBien(formData: any){
        return this.httpClient.post<any>(this.url + "lay-ds-nhom-phan-bien", formData, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }
}
