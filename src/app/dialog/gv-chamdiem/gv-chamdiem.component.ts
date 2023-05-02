import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../giangvien/giangvien-service/giangvien.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GvDialogchamdiemService} from "../../transfer-data-service/gv-dialogchamdiem.service";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {Subject} from "rxjs";
import {QuanlyService} from "../../quanly/quanly-service/quanly.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
    selector: 'app-gv-chamdiem',
    templateUrl: './gv-chamdiem.component.html',
    styleUrls: ['./gv-chamdiem.component.scss']
})
export class GvChamdiemComponent implements OnInit {
    public employeeForm: FormGroup;

    constructor(private fb: FormBuilder,
                public gvChamdiemTransfer: GvDialogchamdiemService,
                public tieuchichamdiemService: TieuchichamdiemService,
                public dialogRef: MatDialogRef<GvChamdiemComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any,
                public quanlyService: QuanlyService,
                public userAuthService: UserAuthService) {
        this.employeeForm = this.fb.group({
            tableRows: this.fb.array([], [Validators.required])
        });

    }

    vaitro;
    pheuChamMau;
    destroy$ = new Subject();

    ngOnInit() {
        this.gvChamdiemTransfer.vaiTroBehaviorSubject.subscribe(res => {
            this.vaitro = res;
        })
        this.tieuchichamdiemService.layPhieuChamMau(this.vaitro).subscribe(
            (res: any) => {
                this.pheuChamMau = res.tieuChiChamDiems;
                this.destroy$.next(this.pheuChamMau);
            })
        this.destroy$.subscribe((phieuMau: any) => {
            phieuMau.forEach(phieu => {
                this.addRow();
            })
        })
        console.log("TRUYEN DATA:", this.pheuChamMau);

    }

    createFormGroup(): FormGroup {
        if (this.editData.sinhVien.length == 2)
            return this.fb.group({
                diemSV1: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
                diemSV2: ['', [Validators.required, Validators.min(0)]],
                ykien: ['']
            });
        else
            return this.fb.group({
                diemSV1: ['', [Validators.required]],
                ykien: ['']
            });
    }

    get getFormControls() {
        const control = this.employeeForm.get('tableRows') as FormArray;
        return control;
    }

    addRow() {
        const control = this.employeeForm.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    onSaveForm() {
        const formValue = this.employeeForm.value;
        console.log(formValue);
        console.log(this.pheuChamMau)
        if (this.editData.sinhVien.length == 2){
            for (let i = 0; i <= this.pheuChamMau.length - 1 ; i++){
                if(this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV1){
                    new NotificationsComponent().showNotification
                    ("danger","Sinh viên 1: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                    this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                }
                if(this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV2){
                    new NotificationsComponent().showNotification
                    ("danger","Sinh viên 2: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                        this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                }
            }
            return;
        }
        else{
            for (let i = 0; i <= this.pheuChamMau.length - 1 ; i++){
                if(this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV1){
                    new NotificationsComponent().showNotification
                    ("danger","Sinh viên 1: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                        this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                }
            }
            return;
        }
        var data = {
            bangDiem: this.employeeForm.value.tableRows,
            sinhVien: this.editData.sinhVien,
            tenTieuChi: this.vaitro,
            maDeTai: this.editData.maDeTai,
            maGiangVien: this.userAuthService.getUserInfo().maGiangVien
        }
        this.dialogRef.close();
        console.log("BANG DIEM NGHE:", data);
        // this.quanlyService.chamDiem(data)
    }
}
