import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../_service/user.service";
import {UserAuthService} from "../_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService,
                private router: Router, private userAuthService: UserAuthService,
                public userDataService: UserDataService) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            tenTaiKhoan: ['', Validators.required],
            password: ['', Validators.required],
        })

    }

    login() {
        this.userService.login(this.loginForm.value).subscribe((res: any) => {
            new NotificationsComponent().showNotification("success","Đăng nhập thành công");
            this.userAuthService.setToken(res.jwtToken)
            this.userAuthService.setRoles(res.user.roles)
            this.userAuthService.setUserInfo(res.user.user)
            this.userDataService.sendUserData(res.user.user);
            const role = res.user.roles[0].roleName;
            console.log("LOGIN - 1")
            if (role === "ROLE_GIANGVIEN") {
                this.router.navigate(['/trangchuGV', this.loginForm.value.tenTaiKhoan])
            } else if (role === "ROLE_SINHVIEN") {
                this.router.navigate(['/trangchuSV', this.loginForm.value.tenTaiKhoan])
            } else if (role === "ROLE_QUANLY") {
                this.router.navigate(['/quanly', this.loginForm.value.tenTaiKhoan])
            }
        }, error => {
            new NotificationsComponent().showNotification("danger","Tên tài khoản hoặc mật khẩu không chính xác");
            console.log(error)
        })
    }
}
