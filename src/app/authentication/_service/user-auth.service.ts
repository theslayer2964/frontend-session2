import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setUserInfo(user: any){
    localStorage.setItem("userData", JSON.stringify(user))
  }
  public getUserInfo(){
    return JSON.parse(localStorage.getItem("userData"))
  }
  public setRoles(roles: []){
    localStorage.setItem("roles", JSON.stringify(roles))
  }
  public getRoles(): any{
    return JSON.parse(localStorage.getItem("roles"));
  }
  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken)
  }
  public getToken(): any{
    return localStorage.getItem("jwtToken")
  }
  public clean(){
    localStorage.clear();
  }
  public isLoggerIn(){
    return this.getRoles() && this.getToken();
  }


}
