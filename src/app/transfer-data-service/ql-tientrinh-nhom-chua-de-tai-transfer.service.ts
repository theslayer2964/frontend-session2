import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QlTientrinhNhomChuaDeTaiTransferService {
  public tientrinhNhomChuaDeTaiBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public sendNhomChuaDeTai(nhomChuaDT: any){
    this.tientrinhNhomChuaDeTaiBehaviorSubject.next(nhomChuaDT);
  }
}
