import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router ) { }
  token!: string
  role!: any;
  ngOnInit(): void {
    this.token = this.userAuthService.getToken();
    this.role = this.userAuthService.getRoles();
    if(this.role){
      if(this.role[0].roleName == 'ROLE_GIANGVIEN'){
        this.router.navigate(['trangchuGV'])
      }
      if(this.role[0].roleName == 'ROLE_SINHVIEN'){
        this.router.navigate(['trangchuSV'])
      }
      if(this.role[0].roleName == 'ROLE_QUANLY'){
        this.router.navigate(['quanly'])
      }
    }
  }

}
