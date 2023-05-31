import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-sv-xin-dang-ky-de-tai',
  templateUrl: './sv-xin-dang-ky-de-tai.component.html',
  styleUrls: ['./sv-xin-dang-ky-de-tai.component.scss']
})
export class SvXinDangKyDeTaiComponent implements OnInit {
  formXinThucHienDetai: FormGroup;
  tinhHopLe: boolean;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<SvXinDangKyDeTaiComponent>,
              private tinNhanService: TinnhanService,
              private userService: UserAuthService) { }

  ngOnInit(): void {
    this.tinhHopLe = this.editData.tinhHopLe;
    this.formXinThucHienDetai = this.formBuilder.group({
      kienThuc:[''],
      kynang:[''],
      thaido:['']
    });
  }

  guiDeTai() {
    console.log("MA DE TAI XIN DK:", this.editData.deTai);
    console.log("FORM XIN DO:", this.formXinThucHienDetai.value);
    let noiDungTinNhan = ' |  | [Kiến Thức:]  ' + this.formXinThucHienDetai.get('kienThuc').value +
        ' [Kỹ Năng:] ' +  this.formXinThucHienDetai.get('kynang').value + ' [Thái Độ:] '
        +  this.formXinThucHienDetai.get('thaido').value + ' | ' + this.editData.deTai.maDeTai + ' | '
        + this.userService.getUserInfo().nhom.maNhom + ' | ' + this.userService.getUserInfo().nhom.tenNhom

    this.tinNhanService.themTinNhanDKDeTai({
      maNguoiNhan: this.editData.deTai.giangVien.maGiangVien,
      maNguoiGui: this.userService.getUserInfo().maSinhVien,
      noiDung: noiDungTinNhan
    }).subscribe(res => {
      this.formXinThucHienDetai.reset();
      this.dialogRef.close()
      new NotificationsComponent().showNotification('success', 'Thêm đề tài từ excel thành công');
    })
  }
}
