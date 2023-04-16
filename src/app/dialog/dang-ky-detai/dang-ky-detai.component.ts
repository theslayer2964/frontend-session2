import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DetaiSvService} from "../../sinhvien/sinhvien-service/detai-sv.service";
import {UserService} from "../../authentication/_service/user.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
    selector: 'app-dang-ky-detai',
    templateUrl: './dang-ky-detai.component.html',
    styleUrls: ['./dang-ky-detai.component.scss']
})


export class DangKyDetaiComponent implements OnInit {


    actionBtn: string = 'Đăng ký';

    constructor(
        public dialogRef: MatDialogRef<DangKyDetaiComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private deTaiService: DetaiSvService,
        private userAuthService: UserAuthService) {
    }


    deTai: any;
    giangVien: any;
    day: boolean;

    ngOnInit(): void {
        this.giangVien = this.data.row.giangVien;
        this.deTai = this.data.row.deTai;
        this.day = this.data.row.full;
        console.log(this.data.row);
    }

    dangKyDeTai(): void {
        if (this.userAuthService.getUserInfo().nhom == null) {
            this.dialogRef.close();
            new NotificationsComponent().showNotification('danger', 'Xin hãy đăng ký nhóm trước khi đăng ký đề tài');
        }
        this.deTaiService.dangKyDeTai({
            maNhom: this.userAuthService.getUserInfo().nhom.maNhom,
            maDeTai: this.deTai.maDeTai,
            vaiTro: this.userAuthService.getRoles()[0].roleName
        }).subscribe({
            next: (res) => {
                console.log(res);
                this.dialogRef.close();
                new NotificationsComponent().showNotification('success', 'Thêm nhóm thành công');
            }
        })
    }

}
