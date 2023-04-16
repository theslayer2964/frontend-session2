import {Component, OnInit} from '@angular/core';
import {UserService} from "../_service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserAuthService} from "../_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ChangepasswordComponent>,
        private userService: UserService,
        private userAuthService: UserAuthService) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            matKhauCu: ['', Validators.required],
            matKhauMoi: ['', Validators.required],
            matKhauMoiXacNhan: ['', Validators.required],
        })
    }

    user: any;
    tenTaiKhoan: any;
    changePassword() {

        if (this.loginForm.get('matKhauMoiXacNhan').value == this.loginForm.get('matKhauMoi').value) {
            const role = this.userAuthService.getRoles()[0].roleName;
            this.user = this.userAuthService.getUserInfo();
            if (role == 'ROLE_SINHVIEN') {
                this.tenTaiKhoan = this.user.maSinhVien;
            } else {
                this.tenTaiKhoan = this.user.maGiangVien;
            }

            this.userService.changePassword({
                tenTaiKhoan: this.tenTaiKhoan ,
                matKhauCu: this.loginForm.get('matKhauCu').value,
                matKhauMoi: this.loginForm.get('matKhauMoiXacNhan').value,
            }).subscribe({
                next: (res) => {
                    console.log(res)
                    this.loginForm.reset();
                    this.dialogRef.close();
                    new NotificationsComponent().showNotification('success', 'Cập nhật mật khẩu thành công');
                },
                error: (err) => {
                    console.log(err)
                    new NotificationsComponent().showNotification('danger', 'Không thể cập nhật mật khẩu');
                }
            })
        } else {
            console.log('aaaaaa')
        }
    }
}
