import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QlTientrinhDetaiTransferService {
  public tientrinhDeTaiBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public sendDeTai(detai: any){
    this.tientrinhDeTaiBehaviorSubject.next(detai);
  }
}
