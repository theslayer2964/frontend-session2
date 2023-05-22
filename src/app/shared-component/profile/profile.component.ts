import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {QlXepTKBHDComponent} from "../../dialog/ql-xep-tkb-hd/ql-xep-tkb-hd.component";
import {GvShowCallendarComponent} from "../../dialog/gv-show-callendar/gv-show-callendar.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,public dialog: MatDialog) { }
  role:string;
  info:any;
  ngOnInit(): void {
    console.log("PROFILE -2")
    this.role = this.userAuthService.getRoles()[0].roleName;
    this.info = this.userAuthService.getUserInfo();
  }

  openCallendar() {
    this.dialog.open(GvShowCallendarComponent, {
      width: "1400px"
    })
  }
}
