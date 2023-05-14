import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DkDetaiContainerTranferService {

  public dkDeTai_ContainerBehaviorSubject = new BehaviorSubject<any>(null)
  constructor() { }

  public clickDangKyDeTai(msg: any){
    this.dkDeTai_ContainerBehaviorSubject.next(msg);
  }
}
