import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginNotificationService {
  public loginNotiSubject = new BehaviorSubject<any>(null);

  constructor() { }

  public loginNotification(msg: any){
    this.loginNotiSubject.next(msg);
  }
}
