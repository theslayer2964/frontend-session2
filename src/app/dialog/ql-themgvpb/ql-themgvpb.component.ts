import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NhomService} from "../../shared-service/nhom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {ThemNhomTransferService} from "../../transfer-data-service/them-nhom-transfer.service";

@Component({
    selector: 'app-ql-themgvpb',
    templateUrl: './ql-themgvpb.component.html',
    styleUrls: ['./ql-themgvpb.component.scss']
})
export class QlThemgvpbComponent implements OnInit {
    nhomDKGVPB: FormGroup;
    actionBtn: string = "Save";

    constructor(private formBuilder: FormBuilder,
                private nhomService: NhomService,
                private dialogRef: MatDialogRef<QlThemgvpbComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any,
                private giangvienService: GiangvienService,
                private hocKyServiceTransfer: ThemNhomTransferService) {
    }

    maNhomL: string;
    tenNhomL: string;
    maDeTaiL: string;
    tenDeTaiL: string;
    maSV1L: string;
    tenSV1L: string;
    maSV2L: string;
    tenSV2L: string;
    tenGiangVienHDL: string;
    maGiangVienHDL: string;
    GVPB1L: string;
    GVPB2L: string;

    mahocKyHienTai: any;
    ngOnInit(): void {
        this.hocKyServiceTransfer.hockyBehaviorSubject.subscribe(res => {
            this.mahocKyHienTai = res;
        })
        this.nhomDKGVPB = this.formBuilder.group({
            maNhom: [''],
            tenNhom: [''],
            maDeTai: [''],
            tenDeTai: [''],
            maSV1: [''],
            tenSV1: [''],
            maSV2: [''],
            tenSV2: [''],
            tenGiangVienHD: [''],
            GVPB1: [''],
            GVPB2: [''],
            maGiangVienHD: [''],
            ngayCham: [''],
            phong: [''],
            tietBatDau:[''],
            tietKetThuc:['']
        })
        if (this.editData) {
            this.maNhomL = this.editData.maNhom;
            this.tenNhomL = this.editData.tenNhom;
            this.maDeTaiL = this.editData.maDeTai;
            this.tenDeTaiL = this.editData.tenDeTai;
            this.maSV1L = this.editData.maSV1;
            this.tenSV1L = this.editData.tenSV1;
            this.maSV2L = this.editData.maSV2;
            this.tenSV2L = this.editData.tenSV2;
            this.tenGiangVienHDL = this.editData.tenGiangVienHD;
            this.maGiangVienHDL = this.editData.maGiangVienHD;
            // this.nhomDKGVPB.controls['phong'].setValue(this.editData.phong);
            // this.nhomDKGVPB.controls['thoiGianBatDau'].setValue(this.editData.thoiGianBatDau);
            // this.nhomDKGVPB.controls['tietBatDau'].setValue(this.editData.tietBatDau);
            // this.nhomDKGVPB.controls['tietKetThuc'].setValue(this.editData.tietKetThuc);
            this.actionBtn = "Cập nhật"
        }
        this.getDSGiangVien();
    }
    dsGV: [];

    dsTenGV: any = [];
    destroy$ = new Subject();

    private getDSGiangVien() {
        this.giangvienService.getDSGV().subscribe(res => {
           this.dsGV = res;
            res.filter((gv: any) => {
                if(gv.maGiangVien!= this.maGiangVienHDL){
                    this.dsTenGV.push({
                        maGV: gv.maGiangVien,
                        tenGV: gv.tenGiangVien
                    });
                }
            })
            this.destroy$.next(this.dsTenGV);
        })
        this.destroy$.subscribe(res => {
            this.dsTenGV = res;
            console.log("DS TEN GV:" , this.dsTenGV);
        })
    }

    addCapNhatGVPB() {
        console.log("DS GV CAN LAM:");
        let data = {
            dsMaGiangVienPB: this.dsGVPB,
            viTriPhanCong: "Phan Bien",
            chamCong: false,
            maNhom: this.maNhomL,
            ngay: this.nhomDKGVPB.value.ngayCham,
            tietBatDau: this.nhomDKGVPB.value.tietBatDau,
            tietKetThuc: this.nhomDKGVPB.value.tietKetThuc,
            phong: this.nhomDKGVPB.value.phong,
            maHocKy: this.mahocKyHienTai
        };
        this.giangvienService.phanCongGV(data).subscribe(res => {
            this.dialogRef.close();
        })
    }
// GV PB:
    toppings = new FormControl('');
    toppingList: any[] = this.dsTenGV;
    dsGVPB = [];
    onDropdownList($event: MatSelectChange) {
        console.log("DS GUI VE:", $event);
        this.dsGVPB = $event.value;
        if($event.value.length > 2){
            new NotificationsComponent().showNotification("danger","Yêu cầu chỉ 2 giảng viên phản biện")
        }
    }
}
