import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatAccordion} from "@angular/material/expansion";
import {HocphantienquyetService} from "../../shared-service/hocphantienquyet.service";

@Component({
    selector: 'app-them-de-tai-gv',
    templateUrl: './them-de-tai-gv.component.html',
    styleUrls: ['./them-de-tai-gv.component.css']
})
export class ThemDeTaiGvComponent implements OnInit {
    actionBtn: string = "Save"

    constructor(private formBuilder: FormBuilder,
                private formBuilder2: FormBuilder,
                private detaiService: DetaiService,
                private dialogRef: MatDialogRef<ThemDeTaiGvComponent>,
                private hocPhanTQService: HocphantienquyetService,
                @Inject(MAT_DIALOG_DATA) public editData: any) {

        this.hocPhanTienQuyetForm = this.formBuilder.group({
            tableRows: this.formBuilder.array([])
        });
        this.addRow();
    }

    ngOnInit(): void {
        this.deTaiForm = this.formBuilder2.group({
            maDeTai: [''],
            gioiHanSoNhomThucHien: ['1', Validators.required],
            moTa: ['', Validators.required],
            mucTieuDeTai: ['', Validators.required],
            sanPhamDuKien: ['', Validators.required],
            tenDeTai: ['', Validators.required],
            yeuCauDauVao: ['', Validators.required],
            maHocKy: [''],
            hocPhanTienQuyet: ['']
        })
        console.log("MA HOC KY NÈ:", this.editData);
        if (this.editData) {
            this.deTaiForm.controls['maDeTai'].setValue(this.editData.maDeTai);
            this.deTaiForm.controls['gioiHanSoNhomThucHien'].setValue(this.editData.gioiHanSoNhomThucHien);
            this.deTaiForm.controls['moTa'].setValue(this.editData.moTa);
            this.deTaiForm.controls['mucTieuDeTai'].setValue(this.editData.mucTieuDeTai);
            this.deTaiForm.controls['sanPhamDuKien'].setValue(this.editData.sanPhamDuKien);
            this.deTaiForm.controls['tenDeTai'].setValue(this.editData.tenDeTai);
            this.deTaiForm.controls['yeuCauDauVao'].setValue(this.editData.yeuCauDauVao);
            this.deTaiForm.controls['maHocKy'].setValue(this.editData.hocKy.maHocKy);
            this.actionBtn = "Update"
        }

        this.getAllHocPhanTQ();
    }

    deTaiForm!: FormGroup;

    addDeTai() {
        console.log("GV - THEm DETAI:", this.deTaiForm.value);
    //     if (this.editData == null) {
            if (this.deTaiForm.valid) {
                this.detaiService.postDeTai(this.deTaiForm.value)
                    .subscribe({
                        next: (res) => {
                            this.deTaiForm.reset();
                            this.dialogRef.close('save');
                            new NotificationsComponent().showNotification('success', 'Cập nhật đề tài thành công');
                        },
                        error: () => {
                            new NotificationsComponent().showNotification('DANGER', 'Không thể thêm đề tài');
                        }
                    })
            }
    //     } else {
    //         console.log('UPDATE NGHE: ' + JSON.stringify(this.deTaiForm.value))
    //         const dtoForm = {
    //             maDeTai: this.deTaiForm.value.maDeTai,
    //             tenDeTai: this.deTaiForm.value.tenDeTai,
    //             mucTieuDeTai: this.deTaiForm.value.mucTieuDeTai,
    //             sanPhamDuKien: this.deTaiForm.value.sanPhamDuKien,
    //             moTa: this.deTaiForm.value.moTa,
    //             yeuCauDauVao: this.deTaiForm.value.yeuCauDauVao,
    //             gioiHanSoNhomThucHien: this.deTaiForm.value.gioiHanSoNhomThucHien,
    //             maGiangVien: this.deTaiForm.value.maGiangVien,
    //             hocKy: {
    //                 maHocKy: this.deTaiForm.value.maHocKy
    //             }
    //
    //         };
    //         this.detaiService.updateDeTai(dtoForm, this.editData.id)
    //             .subscribe({
    //                 next: (res) => {
    //                     this.deTaiForm.reset();
    //                     this.dialogRef.close('update');
    //                     new NotificationsComponent().showNotification('success', 'Cập nhật đề tài thành công');
    //                 },
    //                 error: () => {
    //                     new NotificationsComponent().showNotification('danger', 'Không thể cập nhật đề tài');
    //                 }
    //             })
    //         this.editData = null;
    //     }
    }

    /// YEU CAU DAU VAO - FORM BUILDER:
    @ViewChild(MatAccordion) accordion: MatAccordion;
    public hocPhanTienQuyetForm: FormGroup;
    isCheckAll: boolean = false;

    addRow() {
        const control = this.hocPhanTienQuyetForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    createFormGroup(): FormGroup {
        return this.formBuilder2.group({
            hocPhanTienQuyet: [''],
            diemHocPhanTienQuyet: [''],
            ischecked: [false]
        })
    };

    get getFormControls() {
        const control = this.hocPhanTienQuyetForm.get('tableRows') as FormArray;
        return control;
    }

    checkAll(checkVal: boolean) {
        this.getFormControls.controls.forEach(formGroup => {
            formGroup.get('ischecked')?.setValue(checkVal);
        });
    }

    dsHocPhanTienQuyet:any[];

    getAllHocPhanTQ() {
        this.hocPhanTQService.getAll().subscribe((res: any) => {
            this.dsHocPhanTienQuyet = res;
        })
    }

    removeEmployee(index: number) {
        const control = this.hocPhanTienQuyetForm.get('tableRows') as FormArray;
        control.removeAt(index);
    }

    onSaveHocPhanTienQuyetForm() {
        // console.log("HOC PHAN TIN QUYET:",this.hocPhanTienQuyetForm.value);
        let temp = [];
        this.hocPhanTienQuyetForm.value.tableRows.forEach((row: any) => {
            if (row.ischecked == true) {
                temp.push(row);
            }
        });
        if (temp.length > 0) {
            this.deTaiForm.controls['hocPhanTienQuyet'].setValue(temp);
            new NotificationsComponent().showNotification('success', 'Đã thêm học phần tiên quyết');
        } else
            new NotificationsComponent().showNotification('danger', 'Đánh dấu vào học phần tiên quyết mà bạn muốn');

    }
}
