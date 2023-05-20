import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {NhomService} from "../../shared-service/nhom.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {ThemDeTaiGvComponent} from "../them-de-tai-gv/them-de-tai-gv.component";

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.scss']
})
export class ThongbaoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ThongbaoComponent>, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private nhomService: NhomService,
              private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    console.log("NOI DUNG TIN NHAN:",this.editData);
  }


  choPhepThamGiaNhom() {
    let dsMaSinhVien = [];
    dsMaSinhVien.push(this.userAuthService.getUserInfo().maSinhVien);
    dsMaSinhVien.push(this.editData.sender);
    let maDeTai = null;
    this.nhomService.dangKyNhom({
        dsMaSinhVien: dsMaSinhVien,
        maNhom: this.userAuthService.getUserInfo().nhom.maNhom,
        maDeTai: maDeTai,
        vaiTro: this.userAuthService.getRoles()[0].roleName})
        .subscribe({
          next: (res) => {
            new NotificationsComponent().showNotification('success', 'Cho phép tham gia thành công');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Sinh viên kia đã vào nhóm khác');
          }
        })
  }
    detai:any = "abc";
    chinhSuaDeTai(detai: any) {
      this.dialog.open(ThemDeTaiGvComponent, {
        data: null
      }).afterClosed().subscribe(val => {
        ////
      })
    }
}
