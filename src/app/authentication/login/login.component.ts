import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../_service/user.service";
import {UserAuthService} from "../_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router,private userAuthService: UserAuthService,
              public userDataService: UserDataService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      tenTaiKhoan: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  login() {
    this.userService.login(this.loginForm.value).subscribe((res: any) => {
      console.log(this.loginForm.value)
      this.userAuthService.setToken(res.jwtToken)
      this.userAuthService.setRoles(res.user.roles)
      this.userAuthService.setUserInfo(res.user.user)
      console.log(res)
      const role = res.user.roles[0].roleName;
      if(role === "ROLE_GIANGVIEN"){
        this.router.navigate(['/trangchuGV',this.loginForm.value.tenTaiKhoan])
      }
      else if(role === "ROLE_SINHVIEN"){
        this.router.navigate(['/trangchuSV',this.loginForm.value.tenTaiKhoan])
      }
      else if(role === "ROLE_QUANLY"){
        this.router.navigate(['/trangchuQL',this.loginForm.value.tenTaiKhoan])
      }
      this.userDataService.sendUserData(res);
    }, error => {
      console.log(error)
    })

  }
}
