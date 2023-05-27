import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QlTientrinhSvTransferService {
  public tientrinhBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public sendSV(sv: any){
    this.tientrinhBehaviorSubject.next(sv);
  }
}
