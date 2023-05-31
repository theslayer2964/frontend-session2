import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {DeTai} from "../DeTai.models";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {createI18nOptions} from "@angular-devkit/build-angular/src/utils/i18n-options";

@Injectable({
    providedIn: 'root'
})
export class DetaiService {
    private url = "http://localhost:8080/api/de-tai/";

    private urlQuanLy = "http://localhost:8080/api/quan-ly/";
    token: string = this.userAuthService.getToken();
    private httpHeadersJWT = new HttpHeaders({
        Authorization: `Bearer ${(this.token)}`
    })

    constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
    }

    maGV = this.userAuthService.getUserInfo().maGiangVien;


    postDeTai(data: any): Observable<any> {
        return this.httpClient.post<any>(this.url + 'them-de-tai/' + this.maGV, data, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
        ;
    }

    getDeTaiRoleGV(data: any): Observable<DeTai[]> {
        return this.httpClient.post<DeTai[]>(this.url + 'lay-ds-de-tai-theo-nam-hk/', data, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    getDeTaiRoleGV_Mot(data: string): Observable<DeTai[]> {
        return this.httpClient.get<DeTai[]>(this.url + 'lay-theo-ma/' + data.trim(), {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    updateDeTai(data: any, maGiangVien: any): Observable<any> {
        console.log("DETAI SẺVICE:" + JSON.stringify(data));
        return this.httpClient.put<any>(this.url + "sua-de-tai/"+maGiangVien, data, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    deleteDeTai(id: any) {
        return this.httpClient.delete<any>(this.url + "xoa-de-tai/" + id, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    duyetDeTai(data: any): Observable<any> {
        return this.httpClient.post<any>(this.urlQuanLy + 'duyet-de-tai' , data, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
        ;
    }

    getNhomRoleGV(hocKy: any) {
        return this.httpClient.post<any>(this.url, hocKy, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
        ;
    }
    addDeTaiExcel(file: any, maGV: string) {
        var formData = new FormData();
        formData.append("file", file);
        return this.httpClient.post<any>(this.url + "them-de-tai-excel/" + maGV, formData,{headers: {
                'Accept':'application/json',
                Authorization: `Bearer ${(this.token)}`
            }} ).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
        ;
    }

    xuatDSDeTai(maHK: string) {
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=urtf8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.post(this.urlQuanLy + "xuat-ds-de-tai" ,{maHocKy: maHK},{
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
    });
    }

    xuatFileExcelDetaiMau(){
        let headers = this.httpHeadersJWT;
        headers = headers.set('Content-Type', 'application/json; charset=urtf8');
        headers.append('Accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;')
        return this.httpClient.get(this.url + "xuat-file-mau-de-tai" ,{
            headers: headers,
            responseType: 'arraybuffer',
            observe: 'response'
        });
    }
}
