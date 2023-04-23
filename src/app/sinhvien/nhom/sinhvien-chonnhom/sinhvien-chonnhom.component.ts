import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {HockyService} from "../../../shared-service/hocky.service";
import {ThemNhomComponent} from "../../../dialog/them-nhom/them-nhom.component";
import {NhomService} from '../../../shared-service/nhom.service';
import {DangkyCosanComponent} from "../../../dialog/dangky-cosan/dangky-cosan.component";
import {NotificationsComponent} from "../../../shared-component/notifications/notifications.component";
import {LichService} from "../../../shared-service/lich/lich.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sinhvien-chonnhom',
    templateUrl: './sinhvien-chonnhom.component.html',
    styleUrls: ['./sinhvien-chonnhom.component.css']
})
export class SinhvienChonnhomComponent implements OnInit {
    displayedColumns: string[] = ['maNhom', 'sv1', 'sv2', "action"];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    dsHocKy: HocKy[];
    nhom: any;

    // @ts-ignore
    constructor(public dialog: MatDialog,
                private nhomService: NhomService,
                private hockyService: HockyService,
                private userAuthService: UserAuthService,
                private router: Router
    ) {
    }

    ngOnInit(): void {
        // this.getNhomSV()
        this.getAllHocKy();
        this.nhom = this.userAuthService.getUserInfo().nhom;
        if (this.nhom != null) {
            this.getNhomHienTai();
        } else {
            this.getNhomSVChuaDuyet();
        }

    }

    applyFilter($event: KeyboardEvent) {

    }

    openDialog() {
        this.dialog.open(ThemNhomComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {
                this.getNhomHienTai();
            }
        })
    }

    tempUser: any;

    dangKyNhom(row) {
        this.dialog.open(DangkyCosanComponent, {data: "save"}).afterClosed().subscribe(val => {
            if (val === "save") {
                row.dsMaSinhVien.push(this.userAuthService.getUserInfo().maSinhVien);
                row.vaiTro = this.userAuthService.getRoles()[0].roleName
                console.log(row)
                this.nhomService.dangKyNhom(row)
                    .subscribe({
                        next: (res) => {
                            new NotificationsComponent().showNotification('success', 'Thêm nhóm thành công');
                            this.tempUser = this.userAuthService.getUserInfo();
                            this.tempUser.nhom = res;
                            this.userAuthService.setUserInfo(this.tempUser);
                            this.nhom = this.userAuthService.getUserInfo().nhom;
                        },
                        error: () => {
                            new NotificationsComponent().showNotification('danger', 'Không thể thêm nhóm');
                        }
                    })
            }
        })
    }

    private getNhomSVChuaDuyet() {
        this.nhomService.getNhomChuaDuyet()
            .subscribe({
                next: (res) => {
                    console.log("SV- CHONHOM: ", res)
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: () => {
                    console.log("Error")
                }
            })
    }

    private hocKyHienTai: any;

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value;
        console.log($event.value)
        // this.getNhomSVChuaDuyet($event.value);
    }

    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                this.dsHocKy = res;
                console.log(this.dsHocKy)
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    nhomSV: any;
    dsNhomSinhVien: any;
    trangThai: any;

    deTai: any;

    private getNhomHienTai() {
        this.nhomService.getNhomSinhVien(this.nhom.maNhom).subscribe({
            next: (res) => {
                this.nhomSV = res;
                this.dsNhomSinhVien = this.nhomSV.dsMSSinhVien;
                this.nhom = this.nhomSV.nhom;
                this.trangThai = this.nhomSV.trangThai;
                this.deTai = this.nhomSV.deTai;
                console.log(this.nhomSV);
            }, error: (err) => {
                console.log(err);
            }
        })
    }

    sinhvien: any;

    private roiNhom() {
        this.nhomService.roiNhom({
                dsMaSinhVien: [this.userAuthService.getUserInfo().maSinhVien],
                maNhom: this.nhom.maNhom,
                vaiTro: this.userAuthService.getRoles()[0].roleName
            }
        ).subscribe({
            next: (res) => {
                this.sinhvien = this.userAuthService.getUserInfo();
                this.sinhvien.nhom = res.nhom;
                console.log(this.sinhvien);
                this.userAuthService.setUserInfo(this.sinhvien);
                this.nhom = null;
                this.router.navigate(['/sv-chonNhom']);
                console.log("SV - NHOM:", this.nhom);
                console.log("SV - DIRECT")
            }, error: (err) => {
                console.log(err);
            }
        })
    }
}
