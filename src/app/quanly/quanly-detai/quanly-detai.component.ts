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

@Component({
    selector: 'app-quanly-detai',
    templateUrl: './quanly-detai.component.html',
    styleUrls: ['./quanly-detai.component.scss']
})
export class QuanlyDetaiComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
                private userAuthService: UserAuthService,) {
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

    editProduct(row: any) {
        this.detaiService.duyetDeTai({
            ma: row.maDeTai,
            trangThai: 2
        }).subscribe({
            next: (res) => {
                this.getDSDeTaiTheoHK();
                new NotificationsComponent().showNotification('success', 'Đề tài đã duyệt thành công');
            },
            error: () => {
                new NotificationsComponent().showNotification('danger', 'Không duyệt đề tài này');
                console.log("Error")
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

    deleteProduct(row: any) {
        this.detaiService.duyetDeTai({
            ma: row.maDeTai,
            trangThai: 2
        }).subscribe({
            next: (res) => {
                this.getDSDeTaiTheoHK();
                new NotificationsComponent().showNotification('success', 'Đề tài đã duyệt thành công');
            },
            error: () => {
                new NotificationsComponent().showNotification('danger', 'Không duyệt đề tài này');
                console.log("Error")
            }
        })
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

    }

}
