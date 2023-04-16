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
    private url = "http://localhost:8080/api/ke-hoach/lay-ke-hoach/";
    private urlQL = "http://localhost:8080/api/quan-ly/";
    token: string = this.userAuthService.getToken();
    private httpHeadersJWT = new HttpHeaders({
        Authorization: `Bearer ${(this.token)}`
    })

    constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) {
    }

    getLichTheoHocKyVaMaGV(maHocKy: string, maNguoiDung: string, role: string): Observable<any> {
        let data = {
            "maHocKy": maHocKy,
            "maNguoiDung": maNguoiDung,
            "vaiTro": role
        }
        return this.httpClient.post<any>(this.url, data, {headers: this.httpHeadersJWT})
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
}
