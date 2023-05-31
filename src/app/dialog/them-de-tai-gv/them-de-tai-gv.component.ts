import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatAccordion} from "@angular/material/expansion";
import {HocphantienquyetService} from "../../shared-service/hocphantienquyet.service";
import {MatSelectChange} from "@angular/material/select";

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
            hocPhanTienQuyet: [''],
            doKhoDeTai:['', Validators.required]
        })
        console.log("MA HOC KY NÈ:", this.editData);
        if (this.editData) {
            this.deTaiForm = this.formBuilder2.group({
                maDeTai: [ this.editData.maDeTai],
                gioiHanSoNhomThucHien: [ this.editData.gioiHanSoNhomThucHien,Validators.required],
                moTa: [ this.editData.moTa,Validators.required],
                mucTieuDeTai: [this.editData.mucTieuDeTai,Validators.required],
                sanPhamDuKien: [ this.editData.sanPhamDuKien,Validators.required],
                tenDeTai: [this.editData.tenDeTai,Validators.required],
                yeuCauDauVao: [this.editData.yeuCauDauVao,Validators.required],
                maHocKy: [ this.editData.hocKy.maHocKy],
                hocPhanTienQuyet: [this.editData.hocPhanTienQuyet_DeTais],
                doKhoDeTai:[ this.editData.doKhoDeTai,Validators.required]
            });
            this.actionBtn = "Update"
        }

        this.getAllHocPhanTQ();
    }

    deTaiForm!: FormGroup;

    addDeTai() {
        if (this.editData == null) {
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
        } else {
            this.detaiService.updateDeTai(this.deTaiForm.value, this.editData.giangVien.maGiangVien)
                .subscribe({
                    next: (res) => {
                        this.deTaiForm.reset();
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

    /// YEU CAU DAU VAO - FORM BUILDER:
    @ViewChild(MatAccordion) accordion: MatAccordion;
    public hocPhanTienQuyetForm: FormGroup;
    isCheckAll: boolean = false;

    addRow() {
        const control = this.hocPhanTienQuyetForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }



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

    changeDoKho($event: MatSelectChange) {
        
    }
    createFormGroup(): FormGroup {
        if (this.editData == null){
            return this.formBuilder2.group({
                hocPhanTienQuyet: [''],
                diemHocPhanTienQuyet: [''],
                ischecked: [false]
            })
        } else {
            let diemHPTQ;
            let len =  this.editData.hocPhanTienQuyet_DeTais.length > 0 ? this.editData.hocPhanTienQuyet_DeTais.length - 1: 0;
            let dtep = this.editData.hocPhanTienQuyet_DeTais[len] ? this.editData.hocPhanTienQuyet_DeTais[len].diemTrungBinh : 0;
            switch (dtep) {
                case 0:
                    diemHPTQ = '';
                    break;
                case 5:
                    diemHPTQ = 'trungbinh';
                    break;
                case 7:
                    diemHPTQ = 'kha';
                    break;
                case 8:
                    diemHPTQ = 'gioi';
                    break;
            }
            return this.formBuilder2.group({
                hocPhanTienQuyet: [''],
                diemHocPhanTienQuyet: [diemHPTQ],
                ischecked: [true]
            })
        }

    };

}
