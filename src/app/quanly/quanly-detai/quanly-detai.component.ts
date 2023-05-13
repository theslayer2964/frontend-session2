import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {ThemDeTaiGvComponent} from "../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {DangKyDetaiComponent} from "../../dialog/dang-ky-detai/dang-ky-detai.component";
import {DuyetdetaiComponent} from "../../dialog/duyetdetai/duyetdetai.component";
import {DanhSach_DeTai_KLTN, DS_Nhom_KLTN} from "../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../shared-service/file-generator.service";

@Component({
    selector: 'app-quanly-detai',
    templateUrl: './quanly-detai.component.html',
    styleUrls: ['./quanly-detai.component.css']
})
export class QuanlyDetaiComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog,
                private detaiService: DetaiService,
                private hockyService: HockyService,
                private fileGenerate: FileGeneratorService) {
    }

    ngOnInit(): void {
        this.getAllHocKy();
        this.getDSDeTaiTheoHK();
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

    openDialog() {
        this.dialog.open(ThemDeTaiGvComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {
                this.getDSDeTaiTheoHK();
            }
        })
    }

    // Table
    displayedColumns: string[] = ['maDeTai', "tenDeTai", 'gioiHanSoNhomThucHien', 'moTa', "mucTieuDeTai", "sanPhamDuKien", "trangThai", "yeuCauDauVao", "action"];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)
        console.log('XXX:', this.hocKyHienTai, this.soHocKy);
        this.getDSDeTaiTheoHK();
    }

    // STEP 2
    private getDSDeTaiTheoHK() {
        this.detaiService.getDeTaiRoleGV({
            maHocKy: this.hocKyHienTai,
            soHocKy: this.soHocKy,
            trangThai: this.tinhTrang
        })
            .subscribe({
                next: (res) => {
                    if (res) {
                        console.log("GV _ DeTai:", res);
                        // table
                        this.dataSource = new MatTableDataSource(res);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                },
                error: () => {
                    console.log("Error")
                }
            })
    }

    @Input() validateDeTai;

    tinhTrang: any;
    changeTinhTrang($event: MatSelectChange) {
        this.tinhTrang = $event.value
        this.getDSDeTaiTheoHK();
    }

    downloadFileSV() {
        this.detaiService.xuatDSDeTai().subscribe(res => {
            this.fileGenerate.generateFile(DanhSach_DeTai_KLTN, res['body'], 'xlsx');
        });
    }
    duyetDT(row) {
        this.dialog.open(DuyetdetaiComponent, {data: {row}})
            .afterClosed().subscribe(
            rs => {
                this.getDSDeTaiTheoHK();
            });
    }

}
