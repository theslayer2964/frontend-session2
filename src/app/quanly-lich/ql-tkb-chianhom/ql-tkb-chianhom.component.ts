import {Component, OnInit} from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {MatDialog} from "@angular/material/dialog";
import {XepNhomLichTransferService} from "../../transfer-data-service/xep-nhom-lich-transfer.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LichService} from "../../shared-service/lich/lich.service";
import {MatTableDataSource} from "@angular/material/table";
import {NhomService} from "../../shared-service/nhom.service";
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";

@Component({
    selector: 'app-ql-tkb-chianhom',
    templateUrl: './ql-tkb-chianhom.component.html',
    styleUrls: ['./ql-tkb-chianhom.component.scss']
})
export class QlTkbChianhomComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog, private hockyService: HockyService,
                public xepLichNhomTransferService: XepNhomLichTransferService,
                private fb: FormBuilder, private lichService: LichService, private nhomService: NhomService,
                private quanLyService: QuanlyLichService) {
    }

    ngOnInit(): void {
        this.getAllHocKy();
        this.chiaNhomPB = this.fb.group({
            tableRows: this.fb.array([], [Validators.required])
        });
        this.addRow();
        this.addRow();
        this.addRow();
        this.addRow();
        // this.setValue(res);
        this.chiaNhomHD = this.fb.group({
            tableRowsHD: this.fb.array([], [Validators.required])
        });
        this.addRowHD();
        this.addRowHD();
        this.addRowHD();
        this.addRowHD();
    }

    dsHocKy: HocKy[];

    // 1. STEP 1
    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                this.dsHocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3);
        this.soHocKy = $event.value.toString().slice(2);
        this.xepLichNhomTransferService.sendHocKy($event.value)
    }

    showBangData: any;

    changeLoaiLich($event: MatSelectChange) {
        this.showBangData = $event.value
        if (this.showBangData == 0) {
            this.getDSLichTheoHK(this.hocKyHienTai, "PB");
            this.getDSNhomDeTaiPhanCOngPhanBien();
        } else if (this.showBangData == 1) {
            this.getDSLichTheoHK(this.hocKyHienTai, "HD");
        }
    }

    dsMaGVPB: any = [];

    private getDSLichTheoHK(maHocKy: any, loaiLich: any) {
        this.lichService.layTKBcuaGV(maHocKy, loaiLich).subscribe((res: []) => {
            res.forEach(data => {
                this.dsMaGVPB.push(data)
            })
            this.setValue(res);

        })
    }

    // TABLE PHAN BIEN:
    public chiaNhomPB: FormGroup;

    createFormGroup(): FormGroup {
        return this.fb.group({
            ngay: ['', [Validators.required, Validators.minLength(3)]],
            tiet: ['', [Validators.required]],
            nhom: [''],
            phong: ['']
        });
    }

    get getFormControls() {
        const control = this.chiaNhomPB.get('tableRows') as FormArray;
        return control;
    }

    addRow() {
        const control = this.chiaNhomPB.get('tableRows') as FormArray;
        control.push(this.createFormGroup());
    }

    removeEmployee(index: number) {
        const control = this.chiaNhomPB.get('tableRows') as FormArray;
        control.removeAt(index);
    }

    onSaveForm() {
        const formValue = this.chiaNhomPB.value;
        console.log("ON SAVE:", formValue);
    }

    setValue(res) {
        var data = {
            tableRows: res
        }
        this.chiaNhomPB.patchValue(data);
    }

    dsNhomDePhanCong: any;

    private getDSNhomDeTaiPhanCOngPhanBien() {
        this.nhomService.getDSNhomDePhanCongGVPhanBien({
            maHocKy: this.hocKyHienTai,
            soHocKy: this.soHocKy,
            maGiangVien: 'HD'
        })
            .subscribe(res => {
                this.dsNhomDePhanCong = res;
                console.log("NHOM DETAI PHAN CONG:", res);
            });
    }

    // Table HOI DONG
    public chiaNhomHD: FormGroup;

    createFormGroupHD(): FormGroup {
        return this.fb.group({
            ngay: ['', [Validators.required, Validators.minLength(3)]],
            tiet: ['', [Validators.required]],
            nhom: [''],
            phong: ['']
        });
    }

    get getFormControlsHD() {
        const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
        return control;
    }

    addRowHD() {
        const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
        control.push(this.createFormGroupHD());
    }

    onStatusChangeHD(event: any, index: number) {
        debugger
        if (event.target.value == 'deactive') {
            const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
            control.controls[index].get('state')?.disable();
            control.controls[index].get('city')?.disable();
        } else {
            const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
            control.controls[index].get('state')?.enable();
            control.controls[index].get('city')?.enable();
        }
    }

    removeEmployeeHD(index: number) {
        const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
        control.removeAt(index);
    }

    onSaveFormHD() {
        const formValue = this.chiaNhomHD.value;
        console.log("ON SAVE HD:", formValue);
    }


}
