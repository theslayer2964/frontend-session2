import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QlTientrinhSvChuaNhomTransferService {
  public tientrinhSvChuaNhomBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public sendSVChuaNhom(svChuaNhom: any){
    this.tientrinhSvChuaNhomBehaviorSubject.next(svChuaNhom);
  }
}
