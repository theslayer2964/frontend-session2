import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {NhomService} from "../../shared-service/nhom.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {ThemDeTaiGvComponent} from "../them-de-tai-gv/them-de-tai-gv.component";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.scss']
})
export class ThongbaoComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ThongbaoComponent>, private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private nhomService: NhomService,
              private userAuthService: UserAuthService, private detaiService: DetaiService) { }

  khongCoNoiDungTinNhan: boolean = false;
  ngOnInit(): void {
    console.log("XXX: ",this.editData.info.noiDung.split('|'));
    if(this.editData.info.noiDung.split('|')[2].trim()=='null' || this.editData.info.noiDung.split('|')[2].trim()==' '){
      this.khongCoNoiDungTinNhan = true;
    }
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

    chinhSuaDeTai(detai: any) {
      if(detai){
        console.log("MA DE TAI - THNOG BAO", detai)
        this.detaiService.getDeTaiRoleGV_Mot(detai).subscribe(res => {
          this.dialog.open(ThemDeTaiGvComponent, {
            data: res
          }).afterClosed().subscribe(val => {
          })
        });
      }

    }
}
