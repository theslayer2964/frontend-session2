import {Component, OnInit, ViewChild} from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {GiangvienService} from "../giangvien-service/giangvien.service";
import {GvChamdiemComponent} from "../../dialog/gv-chamdiem/gv-chamdiem.component";
import {GvDialogchamdiemService} from "../../transfer-data-service/gv-dialogchamdiem.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {PhieuChamService} from "../../quanly/quanly-service/phieu-cham.service";
import {FileGeneratorService} from "../../shared-service/file-generator.service";
import {
    DS_Nhom_KLTN,
    MailMerge_PhieuChamHD,
    MailMerge_PhieuChamHoiDong,
    MailMerge_PhieuChamPB
} from "../../shared-service/FileNameExport";
import {error} from "protractor";

@Component({
    selector: 'app-giangvien-chamdiem',
    templateUrl: './giangvien-chamdiem.component.html',
    styleUrls: ['./giangvien-chamdiem.component.scss']
})
export class GiangvienChamdiemComponent implements OnInit {

    constructor(public dialog: MatDialog, private hockyService: HockyService, public userAuthService: UserAuthService,
                private giangvienService: GiangvienService, private gvDialogChamDiemTransfer: GvDialogchamdiemService,
                private formBuilder: FormBuilder, private phieuchamService: PhieuChamService,
                private fileGenerate: FileGeneratorService) {
    }

    maGiangVien: any;


    ngOnInit(): void {
        this.maGiangVien = this.userAuthService.getUserInfo().maGiangVien
        this.getAllHocKy();

        this.luaChonGroup = this.formBuilder.group({
            hocKy: ['', Validators.required],
            dotCham: [''],
            ppcham: [''],
            vaitro: ['']
        })
        this.getDSTheoVaiTro(null, null, this.maGiangVien, null, null);
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

    openDialogExcel() {

    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    hocKyChon: any

    changeHocKy($event: MatSelectChange) {
        this.hocKyChon = $event.value;
    }

    // Table
    displayedColumns: string[] = ["maNhom", "tenNhom", 'maDeTai', "tenDeTai", 'maSV1', 'tenSV1', 'maSV2', 'tenSV2', "vaiTro", "action"];
    dataSource!: MatTableDataSource<any>;

    editProduct(row) {
        console.log("GV - CHAM DIEM - TRUYEN QUA:", row);
        this.dialog.open(GvChamdiemComponent, {
            data: row,
            width: "1150px"
        }).afterClosed().subscribe(res => {
            this.getDSTheoVaiTro(null, null, this.maGiangVien, null, null);
        });
    }

    nhapDiemExcel() {
        console.log("Nhập điểm bằng Excel");
    }

    xuatFileChamDiemMacDinh() {
        console.log("FILE CHAM MAC DINH")
    }

    xuatFileExcel() {
        console.log("XUAT FILE EXCEL KQ")
    }

    vaitro: any;
    dsSV: any;

    getDSTheoVaiTro(hocKy: string, vaiTro: string[], maGiangVien: string, ppcham: string[], dotcham: string) {
        this.giangvienService.getDSSVVaiTroCuThe({
            hocKy: hocKy,
            ppcham: ppcham,
            dotCham: dotcham,
            vaitro: vaiTro,
            maNguoiDung: maGiangVien
        }).subscribe(res => {
            this.dsSV = res;
            console.log("RES", res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    // FORM TIM KÍM:
    luaChonGroup: FormGroup;
    showThongTinHD: boolean = false;

    changeDotChamDiem($event: MatSelectChange) {
        if ($event.value == "HoiDong") {
            this.showThongTinHD = true;
        } else {
            this.showThongTinHD = false;
            this.luaChonGroup.controls['ppcham'].setValue(['']);
            this.luaChonGroup.controls['vaitro'].setValue(['']);
        }
    }

    phuongPhapList: any[] = [{value: 'chamPoster', viewValue: "Poster"}, {
        value: 'chamHoiDong',
        viewValue: "Được Hội Đồng"
    }];
    dsVaiTro: any[] = [
        {value: "CT", viewValue: "Chủ tịch hội đồng"},
        {value: "TK", viewValue: "Thư ký hướng dẫn"},
        {value: "TV3", viewValue: "Thành viên thứ 3"},
    ];

    @ViewChild(MatAccordion) accordion: MatAccordion;

    fileterChange() {
        this.accordion.closeAll();
        console.log(this.luaChonGroup.value);
        this.getDSTheoVaiTro(this.luaChonGroup.controls['hocKy'].value == undefined ? null : this.luaChonGroup.controls['hocKy'].value,
            this.luaChonGroup.controls['vaitro'].value == "" ? null : this.luaChonGroup.controls['vaitro'].value,
            this.maGiangVien, this.luaChonGroup.controls['ppcham'].value == "" ? null : this.luaChonGroup.controls['ppcham'].value,
            this.luaChonGroup.controls['dotCham'].value)
    }

    xuatFile(hd: string) {
        let tenFile = '';
        switch (hd) {
            case 'HD':
                tenFile = MailMerge_PhieuChamHD;
                break;
            case 'PB':
                tenFile = MailMerge_PhieuChamPB;
                break;
            case 'HoiDong':
                tenFile = MailMerge_PhieuChamHoiDong;
                break;
        }
        // Cach1 - dang loi
        // this.phieuchamService.getPhieuChamWord({maGiangVien: this.maGiangVien, vaiTro: hd}).subscribe(res => {
        //     this.fileGenerate.generateFileWord(tenFile, res['body'], 'docx');
        //     new NotificationsComponent().showNotification('success', 'Xuất file '+tenFile+' thành công');
        // },
        //     error => {
        //         console.log(error)
        //         new NotificationsComponent().showNotification('danger', 'Xuất file không thành công');
        //     });
        // Cach 2 - download zip:
        this.phieuchamService.downloadZipPhieuChamWord({maGiangVien: this.maGiangVien, vaiTro: hd})
            .subscribe(blob => {
                const a = document.createElement('a')
                const objectUrl = URL.createObjectURL(blob)
                a.href = objectUrl
                a.download = 'archive.zip';
                a.click();
                URL.revokeObjectURL(objectUrl);
            })
    }
}
