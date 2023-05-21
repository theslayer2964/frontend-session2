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
    displayedColumns: string[] = ['maNhom', 'tenNhom', 'sv1', 'tensv1', 'emailsv1','sv2', 'tensv2', 'emailsv2',"action"];
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



    dangKyNhom(row) {
        console.log("ROW ne:",row);
        this.dialog.open(DangkyCosanComponent, {data: row}).afterClosed().subscribe(val => {
            // if (val === "save") {
            //     this.router.navigate(["/trangchuSV"])
            // }
            this.getNhomHienTai();
        })
    }

    tinhTrang: any
    dsSinhVien: any = [];
    private getNhomSVChuaDuyet() {
        this.nhomService.getNhomChuaDuyet(this.tinhTrang)
            .subscribe({
                next: (res) => {
                    console.log("SV - CHON NHOM: ", res);

                    res.forEach(data => {
                        this.dsSinhVien.push(data.sinhViens)
                    })
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
        if(this.nhom != null){
            this.nhomService.getNhomSinhVien(this.nhom.maNhom).subscribe({
                next: (res) => {
                    console.log("NHOM HIEN TAI:", res);
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
                this.router.navigate(["/trangchuSV"])
            }, error: (err) => {
                console.log(err);
            }
        })
    }
}
