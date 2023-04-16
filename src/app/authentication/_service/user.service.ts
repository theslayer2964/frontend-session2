import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private theUrl = "http://localhost:8080/api/";
  private httpHeaders = new HttpHeaders({
    "No-Auth": "True"
  })

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService
  ) {
  }

  public login(loginData: any) {
    return this.httpClient.post(this.theUrl + 'xac-thuc/dang-nhap', loginData, {headers: this.httpHeaders});
  }
  public changePassword(changePasswordData: any) {
    return this.httpClient.post(this.theUrl + 'xac-thuc/doi-mat-khau', changePasswordData, {headers: this.httpHeaders});
  }
  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles = this.userAuthService.getRoles()
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
