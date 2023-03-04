import { Component, OnInit } from '@angular/core';
import {UserService} from "../../authentication/_service/user.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  public defaultImage: any = './assets/image/logo_iuh.png'

  constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService) {
  }
  public userInfo: any

  ngOnInit(): void {
    // this.userDataService.userBehaviorSubject.subscribe(data => {
    //   console.log(data)
    //   // this.userInfo = data.user
    // })
  if(this.userAuthService.getUserInfo()){
    this.userInfo = this.userAuthService.getUserInfo();
    console.log("xxx: ", this.userInfo);
  }
  }
  public isLoggedIn() {
    return this.userAuthService.isLoggerIn();
  }


  public logout() {
    this.userAuthService.clean();
    console.log("LOGOUT")
    this.router.navigate([''])
  }

  login() {
    console.log("LOGIN")
    this.router.navigate(['login'])
  }
  public getUserData(){

  }
}
