import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemLichTransferService {
  public hockyBehaviorSubject = new BehaviorSubject<any>(null)
  constructor() { }

  public sendHocKy(msg: any){
    this.hockyBehaviorSubject.next(msg)
  }
}
