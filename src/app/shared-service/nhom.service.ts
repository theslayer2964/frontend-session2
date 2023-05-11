import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {UserAuthService} from "../authentication/_service/user-auth.service";
import {FileGeneratorService} from "./file-generator.service";

@Injectable({
    providedIn: 'root'
})
export class NhomService {
    private url = "http://localhost:8080/api/nhom/";

    private urlQuanLy = "http://localhost:8080/api/quan-ly/";
    token: string = this.userAuthService.getToken();
    private httpHeadersJWT = new HttpHeaders({
        Authorization: `Bearer ${(this.token)}`
    })

    constructor(private httpClient: HttpClient, private userAuthService: UserAuthService, private filegeneate: FileGeneratorService) {

    }

    dangKyNhom(data: any): Observable<any> {
        return this.httpClient.post<any>(this.url + "dang-ky-nhom", data, {headers: this.httpHeadersJWT});
    }


    getNhomRoleGV(data: any) {
        return this.httpClient.post<any>(this.url + "lay-ds-nhom", data, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getNhomChuaDuyet(tinhTrang : any) {
        if (tinhTrang == null) {
            tinhTrang = 0;
        }
        return this.httpClient.get<any>(this.url + "lay-ds-nhom/" + tinhTrang, {headers: this.httpHeadersJWT}).pipe(
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

    duyetNhom(data: any) {
        return this.httpClient.post<any>(this.urlQuanLy + "duyet-nhom", data, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getDSNhomDePhanCongGVPhanBien(formData: any){
        return this.httpClient.post<any>(this.url + "lay-ds-nhom-phan-bien", formData, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }

    getDsNhomTrongHocKy(data: any): any{
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.post(this.urlQuanLy + "xuat-ds-nhom" , data,{
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
        });
    }

    getDsNhomPB(data: any): any{
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.post(this.urlQuanLy + "xuat-nhom-ra-pb" , data,{
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
        });
    }

    geMailmerge(data: any): any{
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.post(this.urlQuanLy + "xuat-mailmerge" ,data, {
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
        });
    }

    getKetQuaTrongHocKy(data: any): any{
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.post(this.urlQuanLy + "xuat-ketquanhom-kltn" ,data, {
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
        });
    }

    dangKyNhomCoSan(data: any) {
        return this.httpClient.post<any>(this.url + "dang-ky-co-san", data, {headers: this.httpHeadersJWT}).pipe(
            tap(receiveNhom => receiveNhom),
            catchError(err => of([])));
    }



}
