import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatTableDataSource} from "@angular/material/table";
import {QlXepTKBComponent} from "../../dialog/ql-xep-tkb/ql-xep-tkb.component";
import {QlXepTKBHDComponent} from "../../dialog/ql-xep-tkb-hd/ql-xep-tkb-hd.component";
import {ThemLichTransferService} from "../../transfer-data-service/them-lich-transfer.service";

@Component({
    selector: 'app-ql-giangvien',
    templateUrl: './ql-giangvien.component.html',
    styleUrls: ['./ql-giangvien.component.scss']
})
export class QlGiangvienComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
                private userAuthService: UserAuthService, private themLichTransfer: ThemLichTransferService) {
    }

    ngOnInit(): void {
        this.getAllHocKy();
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
        this.themLichTransfer.sendHocKy($event.value);
    }

    applyFilter($event: KeyboardEvent) {

    }

    showBangData: any;

    changeLoaiLich($event: MatSelectChange) {
        this.showBangData = $event.value
        if (this.showBangData == 0) {
            this.getDSLichTheoHK(this.hocKyHienTai, "PB");
        } else if (this.showBangData == 1) {
            this.getDSLichTheoHK(this.hocKyHienTai, "HD");
        }
    }

    private getDSLichTheoHK(maHocKy: any, loaiLich: any) {

    }

    addThoiKhoaBieuPB() {
        this.dialog.open(QlXepTKBComponent, {}).afterClosed().subscribe(val => {
            if (val == "save") {
                this.getDSLichTheoHK(this.hocKyHienTai, "PB");
            }
        })
    }

    addThoiKhoaBieuHD() {
        this.dialog.open(QlXepTKBHDComponent, {}).afterClosed().subscribe(val => {
            if (val == "save") {
                this.getDSLichTheoHK(this.hocKyHienTai, "HD");
            }
        })
    }

    // Table PHAN BIEN
    displayedColumnsPB: string[] = ["maLich", "tenLich", "ngay", "tiet", "gvpb1", "gvpb2","phong", "action"];
    dataSourcePB!: MatTableDataSource<any>;


    deleteLichPB(maDeTai: any) {

    }

    editLichPB(row) {

    }


    // ///// HỘI ĐỒNG
    displayedColumnsHD: string[] = ["maLich", "tenLich", "ngay", "tiet","chutichhd","tv3","thukyHD" ,"phong", "action"];
    dataSourceHD!: MatTableDataSource<any>;


}
