import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GiangvienService} from "../../giangvien/giangvien-service/giangvien.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GvDialogchamdiemService} from "../../transfer-data-service/gv-dialogchamdiem.service";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {Subject} from "rxjs";
import {PhieuChamService} from "../../quanly/quanly-service/phieu-cham.service";
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
                public phieuChamService: PhieuChamService,
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
        console.log(this.editData)
        this.tieuchichamdiemService.layPhieuChamMau(this.editData.vaiTro).subscribe(
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
        if (this.editData.sinhVien.length == 2) {
            let tongDiemSV1 = 0;
            let tongDiemSV2 = 0;
            for (let i = 0; i <= this.pheuChamMau.length - 1; i++) {
                if (this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV1) {
                    new NotificationsComponent().showNotification
                    ("danger", "Sinh viên 1: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                        this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                        return;
                }
                if (this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV2) {
                    new NotificationsComponent().showNotification
                    ("danger", "Sinh viên 2: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                        this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                    return;
                }
                tongDiemSV1 += formValue.tableRows[i].diemSV1
                tongDiemSV2 += formValue.tableRows[i].diemSV2
            }
            console.log("DIEM SV1:",tongDiemSV1, " - ", tongDiemSV2);
            // TH: 1 rớt 1 đậu:
            if(tongDiemSV1 >= 5 && tongDiemSV2 < 5 || tongDiemSV2 >= 5 && tongDiemSV1 < 5){
                new NotificationsComponent().showNotification("danger",'Lưu ý: 1 nhóm phải cùng đậu (>=5) hoặc cùng rớt (<5). Xin hãy điều chỉnh phù hợp');
                return;
            }
            if(Math.abs(tongDiemSV1 - tongDiemSV2) > 2){
                new NotificationsComponent().showNotification("danger",'Lưu ý: Điểm hợp lệ là các sinh viên không thể chênh nhau quá 2 điểm. Xin hãy điều chỉnh phù hợp');
                return;
            }
        } else {
            for (let i = 0; i <= this.pheuChamMau.length - 1; i++) {
                if (this.pheuChamMau[i].diemToiDa < formValue.tableRows[i].diemSV1) {
                    new NotificationsComponent().showNotification
                    ("danger", "Sinh viên 1: " + this.pheuChamMau[i].maChuanDauRa + " - " +
                        this.pheuChamMau[i].tenChuanDauRa + " điểm số không được vượt quá " + this.pheuChamMau[i].diemToiDa);
                    return;
                }
            }
        }
        var data = {
            bangDiem: this.employeeForm.value.tableRows,
            sinhVien: this.editData.sinhVien,
            tenPhieu: this.editData.vaiTro,
            maDeTai: this.editData.maDeTai,
            maGiangVien: this.userAuthService.getUserInfo().maGiangVien
        }
        this.phieuChamService.chamDiem(data).subscribe({
            next: (res) => {
                console.log(res)
                this.dialogRef.close();
                new NotificationsComponent().showNotification('success', 'Chấm Điểm Sinh Viên Thành Công');
            },
            error: (err) => {
                console.log(err)
                new NotificationsComponent().showNotification('danger', 'Không Chấm Điểm Sinh Viên ');
            }
        })
        this.dialogRef.close();
        console.log("BANG DIEM NGHE:", data);
    }
}
