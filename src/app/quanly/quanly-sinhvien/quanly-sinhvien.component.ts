import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {ThemDeTaiGvComponent} from "../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";
import {ThemgvComponent} from "../../dialog/themgv/themgv.component";
import {ThemSvComponent} from "../../dialog/them-sv/them-sv.component";
import {DialogExcelQlSinhvienComponent} from "../../excel/dialog-excel-ql-sinhvien/dialog-excel-ql-sinhvien.component";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {KetQua_Nhom_KLTN} from "../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../shared-service/file-generator.service";
import {DialogExportExcelComponent} from "../../excel/dialog-export-excel/dialog-export-excel.component";

@Component({
    selector: 'app-quanly-sinhvien',
    templateUrl: './quanly-sinhvien.component.html',
    styleUrls: ['./quanly-sinhvien.component.css']
})
export class QuanlySinhvienComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog,
                private hockyService: HockyService,
                private sinhVienService: SinhvienService,
                private userAuthService: UserAuthService,
                private filegenerate: FileGeneratorService) {
    }

    ngOnInit(): void {
        this.getAllHocKy();

    }

    dsHocKy: HocKy[];

    // 1. STEP 1
    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                console.log("QL- SV- HK:", res);
                this.dsHocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    openDialog() {
        this.dialog.open(ThemSvComponent, {}).afterClosed().subscribe(val => {

        })
    }

    editProduct(row: any) {

    }

    // Table
    displayedColumns: string[] = [
        "maSinhVien", "dienThoai", "email", "gioiTinh", "namNhapHoc", "ngaySinh", "noiSinh", "tenSinhVien",
        "maLopDanhNghia", "maNhom", "action"
    ];
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


    deleteProduct(id: any) {

    }

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)
        this.getDSSinhVien(this.hocKyHienTai, this.soHocKy);
    }

    // STEP 2
    private getDSSinhVien(maHocKy: any, soHocKy: any) {
        this.sinhVienService.layDsSinhVien({
            maHocKy: maHocKy,
            soHocKy: soHocKy
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

    changeTinhTrang($event: MatSelectChange) {

    }

    downloadFileSV() {
        this.sinhVienService.xuatfileMauSV().subscribe(res => {
            this.filegenerate.generateFile("File_Mau_Sinh_Vien", res['body'], 'xlsx');
            new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
        });

    }

    openExcel() {
        this.dialog.open(DialogExcelQlSinhvienComponent, {
            width: "650px"
        }).afterClosed().subscribe(() => {
            this.getDSSinhVien(this.hocKyHienTai, this.soHocKy);
        });
    }
}
