import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-themgv',
  templateUrl: './themgv.component.html',
  styleUrls: ['./themgv.component.scss']
})
export class ThemgvComponent implements OnInit {

  giangVienForm!: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder,

              private sinhVienService: SinhvienService,
              private dialogRef: MatDialogRef<ThemgvComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.giangVienForm = this.formBuilder.group({
      maGiangVien: [''],
      email: ['', Validators.required],
      anhDaiDien: ['', Validators.required],
      soDienThoai: ['', Validators.required],
      tenGiangVien: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      namCongTac: ['', Validators.required],
      gioiTinh: ['', Validators.required],
      hocVi: ['', Validators.required],
      maKhoa: ['', Validators.required],
      cmnd: ['', Validators.required]
    })
  }

  addGiangVien() {

    if (this.editData == null) {
      if (this.giangVienForm.valid) {
        this.sinhVienService.themGiangVien(this.giangVienForm.value)
            .subscribe({
              next: (res) => {
                this.giangVienForm.reset();
                this.dialogRef.close('save');
                console.log("GV - THEm DETAI:", this.giangVienForm.value);
                new NotificationsComponent().showNotification('success', 'Thêm đề tài thành công');
              },
              error: () => {
                new NotificationsComponent().showNotification('DANGER', 'Không thể thêm đề tài');
              }
            })
      }
    } else {
      // console.log('UPDATE NGHE: ' + JSON.stringify(this.s.value))
      //   const dtoForm = {
      //     maDeTai:this.productForm.value.maDeTai,
      //     tenDeTai: this.productForm.value.tenDeTai,
      //     mucTieuDeTai: this.productForm.value.mucTieuDeTai,
      //     sanPhamDuKien: this.productForm.value.sanPhamDuKien,
      //     moTa: this.productForm.value.moTa,
      //     yeuCauDauVao: this.productForm.value.yeuCauDauVao,
      //     gioiHanSoNhomThucHien: this.productForm.value.gioiHanSoNhomThucHien,
      //     maGiangVien:this.productForm.value.maGiangVien,
      //     hocKy: {
      //       maHocKy: this.productForm.value.maHocKy
      //     }
      //   };
      //   this.detaiService.updateDeTai(dtoForm, this.editData.id)
      //       .subscribe({
      //         next: (res) => {
      //           this.productForm.reset();
      //           this.dialogRef.close('update');
      //           new NotificationsComponent().showNotification('success', 'Cập nhật đề tài thành công');
      //         },
      //         error: () => {
      //           new NotificationsComponent().showNotification('danger', 'Không thể cập nhật đề tài');
      //         }
      //       })
      //   this.editData = null;
      // }
    }
  }

}
