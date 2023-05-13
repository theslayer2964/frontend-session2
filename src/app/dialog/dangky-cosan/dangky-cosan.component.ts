import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NhomService} from "../../shared-service/nhom.service";

@Component({
  selector: 'app-dangky-cosan',
  templateUrl: './dangky-cosan.component.html',
  styleUrls: ['./dangky-cosan.component.scss']
})
export class DangkyCosanComponent implements OnInit {

  actionBtn : string = "Gửi";


  constructor(
      private userAuthService: UserAuthService,
      private nhomService: NhomService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<DangkyCosanComponent>,
      private formBuilder: FormBuilder,
  ) {}

  dangKyNhomForm!: FormGroup;
  ngOnInit(): void {
    this.dangKyNhomForm = this.formBuilder.group({
      tinNhan: ['', Validators.required],
    })
  }

  tempUser: any;
  nhom: any;
  dangKyNhomHienTai() {
    this.data.dsMaSinhVien = [];
    this.data.dsMaSinhVien.push(this.userAuthService.getUserInfo().maSinhVien);
    this.data.vaiTro = this.userAuthService.getRoles()[0].roleName
    this.data.password = this.dangKyNhomForm.get('tinNhan').value
    this.data.maNhom = this.data.nhom.maNhom
    console.log( this.data)
    this.nhomService.dangKyNhomCoSan(this.data)
        .subscribe({
          next: (res) => {
            new NotificationsComponent().showNotification('success', 'Gửi lời xin tham gia nhóm thành công');
            this.dangKyNhomForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            new NotificationsComponent().showNotification('danger', 'Không gửi lời xin tham gia nhóm');
          }
        })
  }

}
