import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }
  role:string;
  info:any;
  ngOnInit(): void {
    console.log("PROFILE -2")
    this.role = this.userAuthService.getRoles()[0].roleName;
    this.info = this.userAuthService.getUserInfo();
  }

}
