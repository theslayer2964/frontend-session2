import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GvDialogchamdiemService {
  public vaiTroBehaviorSubject = new BehaviorSubject<any>(null);
  constructor() { }

  public sendVaiTro(msg: any){
    this.vaiTroBehaviorSubject.next(msg);
  }
}
