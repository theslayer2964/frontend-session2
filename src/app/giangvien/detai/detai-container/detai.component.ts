import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ThemDeTaiGvComponent} from "../../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {DetaiService} from "../detai-service/detai.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HockyService} from "../../../shared-service/hocky.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {NotificationsComponent} from "../../../shared-component/notifications/notifications.component";
import {DialogDeTaiGVComponent} from "../../../excel/dialog-de-tai-gv/dialog-de-tai-gv.component";
import {DanhSach_DeTai_KLTN, FILE_MAU_DETAI} from "../../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../../shared-service/file-generator.service";

@Component({
    selector: 'app-detai',
    templateUrl: './detai.component.html',
    styleUrls: ['./detai.component.css'],
})
export class DetaiComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
                private userAuthService: UserAuthService, private fileGenerate: FileGeneratorService) {
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

    openDialog() {
        this.dialog.open(ThemDeTaiGvComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {
                this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
            }
        })
    }

    editProduct(row: any) {
        this.dialog.open(ThemDeTaiGvComponent, {
            data: row
        }).afterClosed().subscribe(val => {
            if (val === "update") {
                this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
            }
        })
    }

    // Table
    displayedColumns: string[] = ['maDeTai', "tenDeTai", 'gioiHanSoNhomThucHien', 'moTa', "mucTieuDeTai", "sanPhamDuKien", "trangThai", "yeuCauDauVao" ,"action"];
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
        this.detaiService.deleteDeTai(id).subscribe({
            next: (res) => {
                this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
                new NotificationsComponent().showNotification('success', 'Xóa đề tài thành công');
            },
            error: () => {
                new NotificationsComponent().showNotification('danger', 'Không thể xóa đề tài');
                console.log("Error")
            }
        })
    }

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)
        console.log('XXX:', this.hocKyHienTai, this.soHocKy);
        this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
    }
    // STEP 2
    private getDSDeTaiTheoHK(maHocKy: any, soHocKy: any) {
        this.detaiService.getDeTaiRoleGV({
            maGiangVien: this.userAuthService.getUserInfo().maGiangVien,
            maHocKy: maHocKy,
            soHocKy: soHocKy
        })
            .subscribe(
                (res) => {
                    if (res) {
                        // table
                        this.dataSource = new MatTableDataSource(res);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                },
                (err) => {
                    console.log(err)
                });
    }
    @Input() validateDeTai;


    openDialogExcel() {
        this.dialog.open(DialogDeTaiGVComponent, {
            width: '650px',
        });
    }

    downloadExcelMau() {
        this.detaiService.xuatFileExcelDetaiMau().subscribe(res => {
            this.fileGenerate.generateFile(FILE_MAU_DETAI, res['body'], 'xlsx');
            new NotificationsComponent().showNotification('success', 'Xuất '+FILE_MAU_DETAI+' thành công');
        });
    }
}
