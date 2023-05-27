import {Component, OnInit} from '@angular/core';
import {
    QlTientrinhSvChuaNhomTransferService
} from "../../transfer-data-service/ql-tientrinh-sv-chua-nhom-transfer.service";
import {
    QlTientrinhNhomChuaDeTaiTransferService
} from "../../transfer-data-service/ql-tientrinh-nhom-chua-de-tai-transfer.service";
import {QuanlyLichService} from "../../shared-service/quanly-lich.service";
import {Dialog} from "@angular/cdk/dialog";
import {DSSVChuaDkNhomComponent} from "../../dialog/dssvchua-dk-nhom/dssvchua-dk-nhom.component";
import {DSNhomChuaDkDeTaiComponent} from "../../dialog/dsnhom-chua-dk-de-tai/dsnhom-chua-dk-de-tai.component";

@Component({
    selector: 'app-quanly-tientrinh-sinhvien',
    templateUrl: './quanly-tientrinh-sinhvien.component.html',
    styleUrls: ['./quanly-tientrinh-sinhvien.component.scss']
})
export class QuanlyTientrinhSinhvienComponent implements OnInit {
    svChuaNhom: number;
    nhomChuaDeTai: number;
    constructor(private qlTientrinhSVChuaNhomTransferService: QlTientrinhSvChuaNhomTransferService,
                private dialog: Dialog,
                private qlTienTrinhNhomChuaDTTransferService: QlTientrinhNhomChuaDeTaiTransferService,
                private quanLyService: QuanlyLichService) {

    }

    ngOnInit(): void {
        this.qlTientrinhSVChuaNhomTransferService.tientrinhSvChuaNhomBehaviorSubject.subscribe(svC => {
            this.svChuaNhom = svC;
        });
        this.qlTienTrinhNhomChuaDTTransferService.tientrinhNhomChuaDeTaiBehaviorSubject.subscribe(nchuaDT => {
            this.nhomChuaDeTai = nchuaDT;
        })
    }

    showDSSVChuaDKNhom() {
        this.dialog.open(DSSVChuaDkNhomComponent,{
            width:'650px'
        });
    }

    showDSNhomChuaDKDeTai() {
        this.dialog.open(DSNhomChuaDkDeTaiComponent,{
            width:'650px'
        })
    }
}
