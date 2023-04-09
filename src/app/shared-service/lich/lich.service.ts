import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, tap} from "rxjs";
import {HocKy} from "../HocKy.models";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Lich} from "./Lich.model";
import {EventInput} from "@fullcalendar/core";

@Injectable({
  providedIn: 'root'
})
export class LichService {
  private url = "http://localhost:4000/event";

  constructor(private httpClient: HttpClient) { }

  getLich(): Observable<any> {
    return this.httpClient.get<any>(this.url,{headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
        .pipe(
            tap(res => res),
            catchError(err => of([])));;
  }
}
