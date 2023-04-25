import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-them-phieu-cham-mau',
  templateUrl: './them-phieu-cham-mau.component.html',
  styleUrls: ['./them-phieu-cham-mau.component.scss']
})
export class ThemPhieuChamMauComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,

              private tieuChiChamDiem: TieuchichamdiemService,
              private dialogRef: MatDialogRef<ThemPhieuChamMauComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  sinhVienForm!: FormGroup;
  actionBtn: string = "Save"

  ngOnInit(): void {
    this.sinhVienForm = this.formBuilder.group({
      tenPhieuCham: ['', Validators.required],
      tieuChiChamDiem: ['', Validators.required],
    })
    console.log(this.editData)
    // if (this.editData) {
    //     this.sinhVienForm.controls['maSinhVien'].setValue(this.editData.maSinhVien);
    //     this.sinhVienForm.controls['anhDaiDien'].setValue(this.editData.gioiHanSoNhomThucHien);
    //     this.sinhVienForm.controls['tenSinhVien'].setValue(this.editData.moTa);
    //     this.sinhVienForm.controls['ngaySinh'].setValue(this.editData.mucTieuDeTai);
    //     this.sinhVienForm.controls['namNhapHoc'].setValue(this.editData.sanPhamDuKien);
    //     this.sinhVienForm.controls['gioiTinh'].setValue(this.editData.tenDeTai);
    //     this.sinhVienForm.controls['maLopDanhNghia'].setValue(this.editData.yeuCauDauVao);
    //     this.sinhVienForm.controls['maLopHocPhan'].setValue(this.editData.hocKy.maHocKy);
    //     this.actionBtn = "Update"
    // }
  }

  addSinhVien() {
    if (this.editData == null) {
      if (this.sinhVienForm.valid) {
        console.log("GV - THEm DETAI:", this.sinhVienForm.value);
        this.tieuChiChamDiem.themPhieuChamMau({
          tenPhieuCham: "aaa",
          tieuChiChamDiems: [ 1]
        })
            .subscribe({
              next: (res) => {
                this.sinhVienForm.reset();
                this.dialogRef.close('save');
                console.log("GV - THEm DETAI:", res);
                new NotificationsComponent().showNotification('success', 'Thêm phiếu thành công');
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
  private getAllTieuChiChamDiem() {
    this.tieuChiChamDiem.layHetTieuChi().subscribe({
      next: (res) => {

      }, error: (err) => {
        console.log(err)
      }
    })
  }
}
