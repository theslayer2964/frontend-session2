import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-them-de-tai-gv',
  templateUrl: './them-de-tai-gv.component.html',
  styleUrls: ['./them-de-tai-gv.component.css']
})
export class ThemDeTaiGvComponent implements OnInit {
  actionBtn : string = "Save"
  constructor(private formBuilder: FormBuilder,
              private detaiService: DetaiService,
              private dialogRef: MatDialogRef<ThemDeTaiGvComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      maDeTai: [''],
      gioiHanSoNhomThucHien: ['', Validators.required],
      moTa: ['', Validators.required],
      mucTieuDeTai: ['', Validators.required],
      sanPhamDuKien: ['', Validators.required],
      tenDeTai: ['', Validators.required],
      yeuCauDauVao: ['', Validators.required],
      trangThai: [''],
      maHocKy:['']
    })
    console.log(this.editData)
    if (this.editData) {
      this.productForm.controls['maDeTai'].setValue(this.editData.maDeTai);
      this.productForm.controls['gioiHanSoNhomThucHien'].setValue(this.editData.gioiHanSoNhomThucHien);
      this.productForm.controls['moTa'].setValue(this.editData.moTa);
      this.productForm.controls['mucTieuDeTai'].setValue(this.editData.mucTieuDeTai);
      this.productForm.controls['sanPhamDuKien'].setValue(this.editData.sanPhamDuKien);
      this.productForm.controls['tenDeTai'].setValue(this.editData.tenDeTai);
      this.productForm.controls['yeuCauDauVao'].setValue(this.editData.yeuCauDauVao);
      this.productForm.controls['maHocKy'].setValue(this.editData.hocKy.maHocKy);
      this.actionBtn = "Update"
    }
  }

  productForm!: FormGroup;

  addDeTai() {
    console.log("GV - THEm DETAI:", this.productForm.value);
    if(this.editData == null){
      if (this.productForm.valid) {
        this.detaiService.postDeTai(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.productForm.reset();
              this.dialogRef.close('save');
              new NotificationsComponent().showNotification('success', 'Thêm đề tài thành công');
            },
            error: () => {
              new NotificationsComponent().showNotification('DANGER', 'Không thể thêm đề tài');
            }
          })
      }
    }
    else{
      console.log('UPDATE NGHE: ' + JSON.stringify(this.productForm.value))
      const dtoForm = {
        maDeTai:this.productForm.value.maDeTai,
        tenDeTai: this.productForm.value.tenDeTai,
        mucTieuDeTai: this.productForm.value.mucTieuDeTai,
        sanPhamDuKien: this.productForm.value.sanPhamDuKien,
        moTa: this.productForm.value.moTa,
        yeuCauDauVao: this.productForm.value.yeuCauDauVao,
        gioiHanSoNhomThucHien: this.productForm.value.gioiHanSoNhomThucHien,
        maGiangVien:this.productForm.value.maGiangVien,
        hocKy: {
          maHocKy: this.productForm.value.maHocKy
        }
      };
        this.detaiService.updateDeTai(dtoForm, this.editData.id)
          .subscribe({
            next: (res) => {
              this.productForm.reset();
              this.dialogRef.close('update');
              new NotificationsComponent().showNotification('success', 'Cập nhật đề tài thành công');
            },
            error: () => {
              new NotificationsComponent().showNotification('danger', 'Không thể cập nhật đề tài');
            }
          })
      this.editData = null;
      }
    }
}
