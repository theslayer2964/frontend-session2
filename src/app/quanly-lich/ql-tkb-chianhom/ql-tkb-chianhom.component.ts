import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {map, Subject, take, takeUntil} from "rxjs";
import {Router} from "@angular/router";

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
                private quanLyService: QuanlyLichService, private router: Router) {
    }

    ngOnInit(): void {
        this.getAllHocKy();
        this.chiaNhomPB = this.fb.group({
            tableRows: this.fb.array([], [Validators.required])
        });
        this.trandata.pipe(take(1)).subscribe((res: any) => {
            res.forEach(() => this.addRow());
        })
        this.chiaNhomHD = this.fb.group({
            tableRowsHD: this.fb.array([], [Validators.required])
        });
        this.trandataHD.pipe(take(1)).subscribe((res: any) => {
            res.forEach(() => this.addRowHD());
        })
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
    viTriPhanCong: any;

    changeLoaiLich($event: MatSelectChange) {
        this.showBangData = $event.value
        if (this.showBangData == 0) {
            this.getDSLichTheoHK(this.hocKyHienTai, "PB");
            this.getDSNhomDeTaiPhanCOngPhanBien("PB");
            this.viTriPhanCong = "phan bien";
        } else if (this.showBangData == 1) {
            this.getDSLichTheoHKHD(this.hocKyHienTai, "HD");
            this.getDSNhomDeTaiPhanCOngPhanBien("HD");
            this.viTriPhanCong = "hoi dong";
        }
    }

    dsTKBPhanBien: any = [];
    // destroyPB$ = new Subject<void>();
    trandata = new Subject();

    private getDSLichTheoHK(maHocKy: any, loaiLich: any) {
        this.lichService.layTKBPhanBien(maHocKy, loaiLich).subscribe((res: []) => {
            this.dsTKBPhanBien = res;
            this.trandata.next(res);
            if (loaiLich == "PB") {
                console.log("QL-TKB-CHIANHOM - Pb:", res);
                let dataPB = [];
                res.forEach((lich: any) => {
                    let temp = {
                        ngay: lich.ngay,
                        tiet: lich.tiet,
                        phong: lich.phong,
                        gv: lich.dsGiangVienPB[0].tenGiangVien + " - " + lich.dsGiangVienPB[1].tenGiangVien,
                        maLich: lich.maLich,
                        tenLich: lich.tenLich,
                        dsGiangVienPB: lich.dsGiangVienPB
                    }
                    dataPB.push(temp);
                    console.log("QL-TKB-CHIANHOM - Pb - temp:", temp);
                })
                this.setValuePB(dataPB); //////////////
            }
        })
    }

    trandataHD = new Subject();
    dsTKBPhanBienHD: any = [];

    private getDSLichTheoHKHD(maHocKy: any, loaiLich: any) {
        this.lichService.layTKBPhanBien(maHocKy, loaiLich).subscribe((res: []) => {
            this.dsTKBPhanBienHD = res;
            this.trandataHD.next(res);
            if (loaiLich == "HD") {
                ////////////CHUA XONG NÈ/////////////
                let dataHD = [];
                console.log("QL-TKB-CHIANHOM - HD:", res);
                res.forEach((lich: any) => {
                    let gvTemp  = '';
                    lich.dsGiangVienPB.forEach(gv => {
                        gvTemp += gv.tenGiangVien + " - "
                    });
                    let temp = {
                        ngay: lich.ngay,
                        tiet: lich.tiet,
                        phong: lich.phong,
                        gv: gvTemp,
                        maLich: lich.maLich,
                        tenLich: lich.tenLich,
                        dsGiangVienPB: lich.dsGiangVienPB
                    }
                    dataHD.push(temp);
                    console.log("QL-TKB-CHIANHOM - HD - temp:", temp);
                })
                this.setValueHD(dataHD);
            }
        })
    }

    // TABLE PHAN BIEN:
    public chiaNhomPB: FormGroup;

    createFormGroup(): FormGroup {
        return this.fb.group({
            ngay: ['', [Validators.required, Validators.minLength(3)]],
            tiet: ['', [Validators.required]],
            nhom: [''],
            phong: [''],
            gv: ['']
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

    gvPBCuaPhongDo;

    removeEmployee(index: number) {
        const control = this.chiaNhomPB.get('tableRows') as FormArray;
        control.removeAt(index);
        console.log("INDEX ne:", index);
    }

    onSaveForm() {
        const formValue = this.chiaNhomPB.value.tableRows;
        console.log("ON SAVE PB 1:", formValue);

        let dataList = [];
        for (let i = 0; i < formValue.length; i++) {
            if (formValue[i].nhom.length > 0) {
                let dateParts = formValue[i].ngay.split("/");
                dataList.push({
                    viTriPhanCong: this.viTriPhanCong,
                    chamCong: false,
                    dsMaGiangVienPB: [this.dsTKBPhanBien[i].dsGiangVienPB[0].maGiangVien, this.dsTKBPhanBien[i].dsGiangVienPB[1].maGiangVien],
                    ngay: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]),
                    tiet: formValue[i].tiet,
                    phong: formValue[i].phong,
                    maNhom: formValue[i].nhom,
                    maHocKy: this.hocKyHienTai
                })
                this.removeEmployee(i);
            }
        }
        this.quanLyService.themDSPhanCong(
            dataList
        ).subscribe(res => {
            new NotificationsComponent().showNotification('success', 'Phân công phản biện thành công');
        }, error => {
            console.log(error)
            new NotificationsComponent().showNotification('danger', "Không cho phép giang viên hướng dẫn chấm phản biện");
        })
    }

    setValuePB(res) {
        var data = {
            tableRows: res
        }
        this.chiaNhomPB.patchValue(data);
    }

    setValueHD(res) {
        console.log("HOI DONG:", res);
        var data = {
            tableRowsHD: res
        }
        this.chiaNhomHD.patchValue(data);
    }

    dsNhomDePhanCong: any;

    private getDSNhomDeTaiPhanCOngPhanBien(loaiLich: string) {
        this.nhomService.getDSNhomDePhanCongGVPhanBien({
            maHocKy: this.hocKyHienTai,
            soHocKy: this.soHocKy,
            vaiTro: loaiLich
        })
            .subscribe((res: []) => {
                this.dsNhomDePhanCong = res;
            });
    }

    private getDSSauKhiLoaiDiDongThuI(i: number) {
        if(this.dsNhomDePhanCong){
            let dsGVCham = this.chiaNhomPB.get('tableRows').value[i].gv.split('-')
            let rs = [];
            this.dsNhomDePhanCong.forEach(nhom => {
                let dem = 0;
                dsGVCham.forEach(gv => {
                    if (gv.trim() != nhom.tenGiangVienHD) {
                        dem++;
                    }
                })
                if(dem==2){
                    rs.push(nhom);
                }
            })
            return rs;
        }
    }

    // Table HOI DONG
    public chiaNhomHD: FormGroup;

    createFormGroupHD(): FormGroup {
        return this.fb.group({
            ngay: ['', [Validators.required, Validators.minLength(3)]],
            tiet: ['', [Validators.required]],
            nhom: [''],
            phong: [''],
            gv: ['']
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


    removeEmployeeHD(index: number) {
        const control = this.chiaNhomHD.get('tableRowsHD') as FormArray;
        control.removeAt(index);
    }

    onSaveFormHD() {
        const formValue = this.chiaNhomHD.value.tableRowsHD;
        console.log("ON SAVE HD 1:", formValue);
        let dataList = [];
        for (let i = 0; i < formValue.length; i++) {
            if (formValue[i].nhom.length > 0) {
                let dateParts = formValue[i].ngay.split("/");
                let dsGVGuiDia = [];
                this.dsTKBPhanBienHD.forEach(gv => {
                    dsGVGuiDia.push(gv.maGiangVien)
                })
                dataList.push({
                    viTriPhanCong: this.viTriPhanCong,
                    chamCong: false,
                    dsMaGiangVienPB: dsGVGuiDia,
                    ngay: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]),
                    tiet: formValue[i].tiet,
                    phong: formValue[i].phong,
                    maNhom: formValue[i].nhom,
                    maHocKy: this.hocKyHienTai
                })
            }
        }
        console.log("ON SAVE HD 2:", dataList);
        this.quanLyService.themDSPhanCong(
            dataList
        ).subscribe(res => {
            new NotificationsComponent().showNotification('success', 'Phân công hội đồng thành công');
            // this.getDSLichTheoHKHD(this.hocKyHienTai, "HD");
            // this.getDSNhomDeTaiPhanCOngPhanBien("HD");
            // this.viTriPhanCong = "hoi dong";
        }, error => {
            console.log(error)
            new NotificationsComponent().showNotification('danger', "Không cho phép giảng viên hướng dẫn chấm hội đồng");
        })
    }


}
