import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DetaiSvService} from "../../sinhvien/sinhvien-service/detai-sv.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {LoiNhanComponent} from "../loi-nhan/loi-nhan.component";

@Component({
    selector: 'app-duyetdetai',
    templateUrl: './duyetdetai.component.html',
    styleUrls: ['./duyetdetai.component.scss']
})
export class DuyetdetaiComponent implements OnInit {

    actionBtn: string = 'Duyệt';
    btn: string = 'Không Duyệt';

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<DuyetdetaiComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private deTaiService: DetaiService,
        private userAuthService: UserAuthService) {
    }


    deTai: any;
    giangVien: any;
    day: boolean;

    ngOnInit(): void {
        this.giangVien = this.data.row.giangVien;
        this.deTai = {
            maDeTai: this.data.row.maDeTai,
            tenDeTai: this.data.row.tenDeTai,
            gioiHanSoNhomThucHien: this.data.row.gioiHanSoNhomThucHien,
            moTa: this.data.row.moTa,
            mucTieuDeTai: this.data.row.mucTieuDeTai,
            yeuCauDauVao: this.data.row.yeuCauDauVao,
            trangThai: this.data.row.trangThai,
        }
        this.day = this.data.row.full;
        console.log(this.data.row);
    }
    editProduct() {
        this.deTaiService.duyetDeTai({
            ma: this.deTai.maDeTai,
            trangThai: 2
        }).subscribe({
            next: (res) => {
                this.dialogRef.close();
                new NotificationsComponent().showNotification('success', 'Đề tài đã duyệt thành công');
            },
            error: () => {
                new NotificationsComponent().showNotification('danger', 'Không duyệt đề tài này');
                console.log("Error")
            }
        })
    }

    loiNhan: any = "";
    deleteProduct() {
        this.dialog.open(LoiNhanComponent, {data: this.loiNhan})
            .afterClosed().subscribe(result => {
            if ( result != "'close'") {
                this.deTaiService.duyetDeTai({
                    ma: this.deTai.maDeTai,
                    loiNhan: result,
                    trangThai: 1
                }).subscribe({
                    next: (res) => {
                        this.dialogRef.close();
                        new NotificationsComponent().showNotification('success', 'Đề tài đã duyệt thành công');
                    },
                    error: () => {
                        new NotificationsComponent().showNotification('danger', 'Không duyệt đề tài này');
                        console.log("Error")
                    }
                })
            }

        })
    }

}
