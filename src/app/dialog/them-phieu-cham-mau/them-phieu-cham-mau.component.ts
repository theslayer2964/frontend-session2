import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {HockyService} from "../../shared-service/hocky.service";

interface GiangVien {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-them-phieu-cham-mau',
    templateUrl: './them-phieu-cham-mau.component.html',
    styleUrls: ['./them-phieu-cham-mau.component.scss']
})
export class ThemPhieuChamMauComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
                private tieuChiChamDiem: TieuchichamdiemService,
                private hocKyService: HockyService,
                private dialogRef: MatDialogRef<ThemPhieuChamMauComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any) {
    }

    sinhVienForm!: FormGroup;
    actionBtn: string = "Save"

    ngOnInit(): void {
        this.getHocKyMoiNhat();
        this.getAllTieuChiChamDiem();
        this.sinhVienForm = this.formBuilder.group({
            tenPhieuCham: ['', Validators.required],
            tableRows: this.formBuilder.array([], [Validators.required])
        })
        this.destroy$.subscribe((res: []) => {
            res.forEach(tieuchi => {
                this.addRow();
            })
            this.setValue(res);
        })

    }

    dsTieuChi: any = [];

    addSinhVien() {
        if (this.sinhVienForm.valid && this.dsMaTieuChi.length > 0) {
            console.log("GV - THEm DETAI:", this.sinhVienForm.value);
            this.tieuChiChamDiem.themPhieuChamMau({
                tenPhieuCham: this.sinhVienForm.get('tenPhieuCham').value,
                tieuChiChamDiems: this.dsMaTieuChi,
                vaiTroDung: this.giangVien,
                maHocKy: this.hocKy.maHocKy
            }).subscribe({
                next: (res) => {
                    this.sinhVienForm.reset();
                    this.dialogRef.close('save');
                    console.log("GV - THEm DETAI:", res);
                    new NotificationsComponent().showNotification('success', 'Thêm phiếu thành công');
                },
                error: () => {
                    new NotificationsComponent().showNotification('danger', 'Không thể thêm phiếu');
                }
            })
        } else {
            new NotificationsComponent().showNotification('danger', 'Xin hãy nhập đủ thông tin');
        }
    }

    dsVaiTro: GiangVien[] = [
        {value: "HD", viewValue: "Giảng viên hướng dẫn"},
        {value: "PB", viewValue: "Giảng viên phản biện"},
        {value: "CT", viewValue: "Chủ tịch hội đồng"},
        {value: "TK", viewValue: "Thư ký hướng dẫn"},
        {value: "TV3", viewValue: "Thành viên thứ 3"},
    ];
    destroy$ = new Subject();

    private getAllTieuChiChamDiem() {
        this.tieuChiChamDiem.layHetTieuChi().subscribe(res => {
                this.dsTieuChi = res;
                console.log("LAY HET TIEU CHI:", this.dsTieuChi);
                this.destroy$.next(res);
            }
        )
    }

    hocKy: any;

    private getHocKyMoiNhat() {
        this.hocKyService.getHocKyMoiNhat().subscribe({
            next: (res) => {
                this.hocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    dsMaTieuChi = [];

    giangVien: any;

    changeGiangVien($event: MatSelectChange) {
        this.giangVien = $event.value;
    }

    ///INLINE TABLE:///
    isCheckAll: boolean = false;

    createFormGroup(): FormGroup {
        return this.formBuilder.group({
            maChuanDauRa: ['', [Validators.required]],
            tenChuanDauRa: ['', [Validators.required]],
            diemToiDa: [''],
            ischecked: [false]
        });
    }

    get getFormControls() {
        const control = this.sinhVienForm.get('tableRows') as FormArray;
        return control;
    }

    addRow() {
        const control = this.sinhVienForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    checkAll(checkVal: boolean) {
        this.getFormControls.controls.forEach(formGroup => {
            formGroup.get('ischecked')?.setValue(checkVal);
        });
    }

    onSaveForm() {
        const formValue = this.sinhVienForm.value;
        console.log("THEM DE TAI:", formValue.tableRows);
        var tongDiem = 0;
        formValue.tableRows.filter(tieuchi => {
            if (tieuchi.ischecked) {
                tongDiem += tieuchi.diemToiDa;
                this.dsMaTieuChi.push(tieuchi.maChuanDauRa)
            }
        })
        if (tongDiem != 10) {
            new NotificationsComponent().showNotification("warning", "Tổng điểm tất cả các tiêu chí phải là 10đ");
            this.dsMaTieuChi = [];
        } else {
            if (this.sinhVienForm.valid && this.giangVien != null) {
                this.tieuChiChamDiem.themPhieuChamMau({
                    tenPhieuCham: this.sinhVienForm.get('tenPhieuCham').value,
                    tieuChiChamDiems: this.dsMaTieuChi,
                    vaiTroDung: this.giangVien,
                    maHocKy: this.hocKy.maHocKy
                }).subscribe({
                    next: (res) => {
                        this.sinhVienForm.reset();
                        this.dialogRef.close('save');
                        console.log("GV - THEm DETAI:", res);
                        new NotificationsComponent().showNotification('success', 'Thêm phiếu thành công');
                        this.dsMaTieuChi = [];
                    },
                    error: () => {
                        new NotificationsComponent().showNotification('danger', 'Không thể thêm phiếu');
                        this.dsMaTieuChi = [];
                    }
                })
            } else {
                new NotificationsComponent().showNotification("danger", "Điền Đủ thông tin.....");
                this.dsMaTieuChi = [];
            }


        }
    }

    setValue(res
                 :
                 any
    ) {
        var data = {
            tableRows: res
        }
        this.sinhVienForm.patchValue(data);
    }
}
