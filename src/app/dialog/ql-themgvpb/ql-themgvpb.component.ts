import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NhomService} from "../../shared-service/nhom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith, Subject} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";

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
                private giangvienService: GiangvienService) {
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

    ngOnInit(): void {
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
            maGiangVienHD: ['']
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
            // this.editData.GVPB1;
            // this.editData.GVPB2;
            this.actionBtn = "Cập nhật"
        }
        this.getDSGiangVien();
    }
    dsGV: [];

    dsMaGV: any;
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
            maNhom: this.maNhomL
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
