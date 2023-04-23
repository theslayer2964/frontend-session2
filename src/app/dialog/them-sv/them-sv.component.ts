import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
    selector: 'app-them-sv',
    templateUrl: './them-sv.component.html',
    styleUrls: ['./them-sv.component.scss']
})
export class ThemSvComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,

                private sinhVienService: SinhvienService,
                private dialogRef: MatDialogRef<ThemSvComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any) {
    }

    sinhVienForm!: FormGroup;
    actionBtn: string = "Save"

    ngOnInit(): void {
        this.sinhVienForm = this.formBuilder.group({
            maSinhVien: [''],
            email: ['', Validators.required],
            anhDaiDien: ['', Validators.required],
            dienThoai: ['', Validators.required],
            tenSinhVien: ['', Validators.required],
            ngaySinh: ['', Validators.required],
            namNhapHoc: ['', Validators.required],
            gioiTinh: ['', Validators.required],
            maLopDanhNghia: ['', Validators.required],
            noiSinh: ['', Validators.required],
            maLopHocPhan: ['']
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
                this.sinhVienService.themSinhVien(this.sinhVienForm.value)
                    .subscribe({
                        next: (res) => {
                            this.sinhVienForm.reset();
                            this.dialogRef.close('save');
                            console.log("GV - THEm DETAI:", this.sinhVienForm.value);
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
