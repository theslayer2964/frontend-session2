import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ThemNhomComponent} from "../../dialog/them-nhom/them-nhom.component";
import {MatSelectChange} from "@angular/material/select";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {FileGeneratorService} from "../../shared-service/file-generator.service";
import {
    DS_Nhom_KLTN,
    DS_Nhom_KLTN_RA_HD_POSTER,
    KetQua_Nhom_KLTN,
    MailMerge_PhieuChamHD
} from "../../shared-service/FileNameExport";
import {QlXepTKBComponent} from "../../dialog/ql-xep-tkb/ql-xep-tkb.component";
import {DialogExportExcelComponent} from "../../excel/dialog-export-excel/dialog-export-excel.component";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
    selector: 'app-quanly-nhom',
    templateUrl: './quanly-nhom.component.html',
    styleUrls: ['./quanly-nhom.component.scss']
})
export class QuanlyNhomComponent implements OnInit {
    displayedColumns: string[] = ['maNhom', 'maDeTai', 'sv1', 'sv2', "danhGia", "action"];
    dataSource!: MatTableDataSource<any>;
    dsHocKy: HocKy[];

    constructor(public dialog: MatDialog, private nhomService: NhomService, private hockyService: HockyService,
                private userAuthService: UserAuthService, private filegenerate: FileGeneratorService,
                private _liveAnnouncer: LiveAnnouncer) {

    }

    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                this.dsHocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    ngOnInit(): void {
        this.getAllHocKy();
        console.log("PAREN TO CHILD:", this.validateNhom);
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editProduct(row: any) {
        this.nhomService.duyetNhom({
            ma: row.nhom.maNhom,
            trangThai: 1,
            maHocKy: this.hocKyHienTai
        }).subscribe({
            next: (res) => {
                if (res) {
                    this.getDsNhom()
                    new NotificationsComponent().showNotification('success', 'Duyệt nhóm thành công');
                }
            },
            error: () => {
                console.log("Error")
                new NotificationsComponent().showNotification('success', 'Duyệt nhóm thất bại');
            }
        })
    }

    deleteProduct(id) {

    }

    private hocKyHienTai: any;
    private soHocKy: any;

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)

        this.getDsNhom();
    }

    tinhTrang: any;

    private getDsNhom() {
        this.nhomService.getNhomRoleGV({
            maHocKy: this.hocKyHienTai,
            soHocKy: this.soHocKy,
            trangThai: this.tinhTrang
        })
            .subscribe({
                next: (res) => {
                    if (res) {
                        let rs = [];
                        res.forEach(data => {
                            rs.push({
                                maNhom: data.nhom.maNhom,
                                maDeTai: data.maDeTai ? data.maDeTai : "---",
                                sv1: data.sinhViens[0].maSinhVien + " - " + data.sinhViens[0].tenSinhVien,
                                sv2: data.sinhViens[1] ? data.sinhViens[1].maSinhVien + " - " + data.sinhViens[1].tenSinhVien : "---",
                                danhGia: data.nhom.tinhTrang
                            })
                        });
                        this.dataSource = new MatTableDataSource(rs);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                },
                error: () => {
                    console.log("Error")
                }
            })
    }

    // Table
    @Input() validateNhom: any;

    changeTinhTrang($event: MatSelectChange) {
        this.tinhTrang = $event.value
        this.getDsNhom();
    }

    maHocKy: any = "hocKy";

    downloadFileSV() {
        this.dialog.open(DialogExportExcelComponent, {data: {variable: this.maHocKy, ma: null}}).afterClosed().subscribe(val => {
            if (val.ma != null && val.ma != undefined && val.ma != "") {
                this.nhomService.getDsNhomTrongHocKy({maHocKy: val.ma}).subscribe(res => {
                    this.filegenerate.generateFile(DS_Nhom_KLTN, res['body'], 'xlsx');
                    new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
                });
            } else {
                new NotificationsComponent().showNotification('danger', 'Hãy chọn học kỳ');
            }
        })
    }

    downloadFileChamDiemNhom() {
        this.dialog.open(DialogExportExcelComponent, {data: {variable: this.maHocKy, ma: null}}).afterClosed().subscribe(val => {
            if (val.ma != null && val.ma != undefined && val.ma != "") {
                this.nhomService.getDsNhomPB({maHocKy: val.ma}).subscribe(res => {
                    this.filegenerate.generateFile(DS_Nhom_KLTN_RA_HD_POSTER, res['body'], 'xlsx');
                    new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
                });
            }else {
                new NotificationsComponent().showNotification('danger', 'Hãy chọn học kỳ');
            }
        })
    }

    downloadFileMailMerge() {
        this.dialog.open(DialogExportExcelComponent, {data: {variable: this.maHocKy, ma: null}}).afterClosed().subscribe(val => {
            if (val.ma != null && val.ma != undefined && val.ma != "") {
                this.nhomService.geMailmerge({maHocKy: val.ma}).subscribe(res => {
                    this.filegenerate.generateFile(MailMerge_PhieuChamHD, res['body'], 'xlsx');
                    new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
                });
            }
        })
    }

    downloadFileDsNhomKLTN() {
        this.dialog.open(DialogExportExcelComponent, {data: {variable: this.maHocKy, ma: null}}).afterClosed().subscribe(val => {
            if (val.ma != null && val.ma != undefined && val.ma != "") {
                this.nhomService.getKetQuaTrongHocKy({maHocKy: val.ma}).subscribe(res => {
                    this.filegenerate.generateFile(KetQua_Nhom_KLTN, res['body'], 'xlsx');
                    new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
                });
            }else {
                new NotificationsComponent().showNotification('danger', 'Hãy chọn học kỳ');
            }
        })
    }
}
