import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public userBehaviorSubject = new BehaviorSubject<any>(null)
  constructor() { }

  public sendUserData(msg: any){
    this.userBehaviorSubject.next(msg)
  }
}
