import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {HocKy} from "../HocKy.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Lich} from "./Lich.model";
import {EventInput} from "@fullcalendar/core";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Injectable({
    providedIn: 'root'
})
export class LichService {
    private url = "http://localhost:8080/api/ke-hoach/";
    private urlQL = "http://localhost:8080/api/quan-ly/";
    token: string = this.userAuthService.getToken();
    private httpHeadersJWT = new HttpHeaders({
        Authorization: `Bearer ${(this.token)}`
    })

    constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
    }

    getLichTheoHocKyVaMaGV(maHocKy: any, maNguoiDung: string, role: string | null): Observable<any> {
        let data = {
            "maHocKy": maHocKy,
            "maNguoiDung": maNguoiDung,
            "vaiTro": role
        }
        return this.httpClient.post<any>(this.url + 'lay-ke-hoach/', data, {headers: this.httpHeadersJWT})
            .pipe(
                tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    updateLich(keHoach: any): Observable<any> {
        console.log("SERVCIE:", keHoach);
        return this.httpClient.put<any>(this.urlQL + "cap-nhat-ke-hoach", keHoach, {headers: this.httpHeadersJWT})
            .pipe(
                tap(res => {
                    res = res;
                }),
                catchError(err => of([]))
            );
    }

    fetchData() {
        return this.httpClient.get<any>("http://localhost:4000/event", {headers: this.httpHeadersJWT})
            .pipe(
                tap(res => {
                    console.log("res fecth:", res);
                    res = res;
                }),
                catchError(err => of([]))
            );
    }

    validateLich(data: any): Observable<any> {
        return this.httpClient.post<any>(this.url + "lay-ke-hoach-theo-ten", data, {headers: this.httpHeadersJWT})
            .pipe();
    }

    tachNgay() {
        return this.httpClient.get(this.url + "tach-ke-hoach", {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    tachNgayHD() {
        return this.httpClient.get(this.url + "tach-ke-hoach-hd", {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    tachPhong(ngay: any, tiet: any) {
        return this.httpClient.post(this.url + "lay-phong",{
            ngay,tiet
        } ,{headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    tachGiangVien(ngay: any, tiet: any, phong: any) {
        return this.httpClient.post(this.url + "lay-giangvien", {ngay, tiet, phong}, {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }
    xepLichGiangVienPB(data: any){
        return this.httpClient.post(this.url + "tao-kehoach-giangvien-pb", data, {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    xepLichGiangVienHD(data: any){
        return this.httpClient.post(this.url + "tao-kehoach-giangvien-hd", data, {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }

    layTKBPhanBien(maHocKy: any, lich: any){
        return this.httpClient.post(this.url + "lay-lich-hocky-pb", {
            maHocKy, lich
        }, {headers: this.httpHeadersJWT})
            .pipe(tap(res => {
                    res = res;
                }),
                catchError(err => of([])));
    }
}
