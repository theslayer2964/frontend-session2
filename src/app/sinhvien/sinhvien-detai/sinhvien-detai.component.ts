import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {DetaiSvService} from "../sinhvien-service/detai-sv.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DangKyDetaiComponent} from "../../dialog/dang-ky-detai/dang-ky-detai.component";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {SvXinDangKyDeTaiComponent} from "../../dialog/sv-xin-dang-ky-de-tai/sv-xin-dang-ky-de-tai.component";


@Component({
    selector: 'app-sinhvien-detai',
    templateUrl: './sinhvien-detai.component.html',
    styleUrls: ['./sinhvien-detai.component.scss']
})
export class SinhvienDetaiComponent implements OnInit {


    ngOnInit(): void {
        this.getDSDeTaiTheoHK();
        this.nhom = this.userAuthService.getUserInfo().nhom;
        if (this.nhom.deTai != null) {
            this.deTai = this.nhom.deTai;
            this.giangVien = this.deTai.giangVien;
            console.log(this.deTai);
        }

    }

    private hocKyHienTai: any;

    constructor(public dialog: MatDialog,
                private detaiService: DetaiSvService,
                private hockyService: HockyService,
                private userAuthService: UserAuthService) {
    }

    private getDSDeTaiTheoHK() {
        this.hockyService.getHocKyMoiNhat().subscribe({
            next: (res) => {

                this.hocKyHienTai = res;
                this.detaiService.xemDeTaiCanDangKy({
                    maHocKy: this.hocKyHienTai.maHocKy,
                    soHocKy: this.hocKyHienTai.soHocKy,
                    trangThai: 2
                })
                    .subscribe({
                        next: (res) => {
                            this.dataSource = new MatTableDataSource(res);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                        },
                        error: () => {
                            console.log("Error")
                        }
                    })

            },
            error: () => {
                console.log("Error")
            }
        })
    }

    displayedColumns: string[] = ['giangVien', 'tenDeTai', 'mucTieuDeTai', 'sanPhamDuKien', 'yeuCauDauVao', 'soNhomThucHien',
        'doKhoDeTai', 'action'];
    dataSource!: MatTableDataSource<any>;

    nhom: any;
    giangVien: any;
    deTai: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    dangDT(row) {
        this.detaiService.kiemTraTinhHopLe({
            maDeTai: row.deTai.maDeTai,
            maSinhVien: this.userAuthService.getUserInfo().maSinhVien
        }).subscribe(res => {
            this.dialog.open(SvXinDangKyDeTaiComponent, {
                data: {deTai: row, tinhHopLe: res},
                width: '650px'
            });
        })


        // dk de tai:
        // this.dialog.open(DangKyDetaiComponent, {data: {row}})
        //     .afterClosed().subscribe(
        //     rs => {
        //         this.nhom = this.userAuthService.getUserInfo().nhom;
        //         if (this.nhom.deTai != null) {
        //             this.deTai = this.nhom.deTai;
        //         }
        //     });
    }


}
