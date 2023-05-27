import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QlTientrinhGvTransferService {
  public tientrinhGvBehaviorSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public sendGV(gv: any){
    this.tientrinhGvBehaviorSubject.next(gv);
  }
}
