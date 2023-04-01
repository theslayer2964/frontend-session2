import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {DeTai} from "../DeTai.models";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";

@Injectable({
    providedIn: 'root'
})
export class DetaiService {
    private url = "http://localhost:8080/api/giang-vien/";
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

    updateDeTai(data: any, id: any): Observable<any> {
        console.log("DETAI SẺVICE:" + JSON.stringify(data));
        return this.httpClient.put<any>(this.url + "sua-de-tai/", data, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    deleteDeTai(id: any) {
        return this.httpClient.delete<any>(this.url + "xoa-de-tai/" + id, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
    }

    getNhomRoleGV(hocKy: any) {
        return this.httpClient.post<any>(this.url, hocKy, {headers: this.httpHeadersJWT}).pipe(
            tap(recieveDeTai => recieveDeTai),
            catchError(err => of([])));
        ;
    }
}
