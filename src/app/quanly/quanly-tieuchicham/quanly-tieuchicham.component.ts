import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {ThemHockyComponent} from "../../dialog/them-hocky/them-hocky.component";
import {ThemTieuChiChamdiemComponent} from "../../dialog/them-tieu-chi-chamdiem/them-tieu-chi-chamdiem.component";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  DialogExcelQlGiangvienComponent
} from "../../excel/dialog-excel-ql-giangvien/dialog-excel-ql-giangvien.component";
import {
  DialogExcelTieuChiChamDiemComponent
} from "../../excel/dialog-excel-tieu-chi-cham-diem/dialog-excel-tieu-chi-cham-diem.component";
import {DialogExportExcelComponent} from "../../excel/dialog-export-excel/dialog-export-excel.component";
import {DanhSach_DeTai_KLTN, FILE_MAU_TIEUCHI} from "../../shared-service/FileNameExport";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {FileGeneratorService} from "../../shared-service/file-generator.service";

@Component({
  selector: 'app-quanly-tieuchicham',
  templateUrl: './quanly-tieuchicham.component.html',
  styleUrls: ['./quanly-tieuchicham.component.scss']
})
export class QuanlyTieuchichamComponent implements OnInit {

  constructor(public dialog: MatDialog,   private tieuChiChamDiem: TieuchichamdiemService,
              private userAuthService: UserAuthService, private router: Router,
              private fileGenerator: FileGeneratorService) { }
  ngOnInit(): void {
    this.getAllTieuChiChamDiem();
  }


  displayedColumns: string[] = ["maChuanDauRa","tenChuanDauRa","diemToiDa" ,"action"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // 1. STEP 1
  private getAllTieuChiChamDiem() {
    this.tieuChiChamDiem.layHetTieuChi().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        console.log(err)
      }
    })
  }


    xuatFileChamDiemMacDinh() {
          this.tieuChiChamDiem.xuatFileMauTC().subscribe(res => {
            this.fileGenerator.generateFile(FILE_MAU_TIEUCHI, res['body'], 'xlsx');
            new NotificationsComponent().showNotification('success', 'Xuất '+FILE_MAU_TIEUCHI+' thành công');
          });
      }

  nhapExcel() {
    this.dialog.open(DialogExcelTieuChiChamDiemComponent,{
      width:"650px"
    }).afterClosed().subscribe(() => {
      this.getAllTieuChiChamDiem();
    })
  }

  addTieuChiCham() {
    this.dialog.open(ThemTieuChiChamdiemComponent, {}).afterClosed().subscribe(val => {
      if (val === "save") {
          this.getAllTieuChiChamDiem();
      }
    })
  }

  applyFilter($event: KeyboardEvent) {
  }
  // Table


  editProduct(row) {
    
  }

  deleteProduct(maDeTai: any) {
    
  }

  directPhieuCham() {
    this.router.navigate(["/quanly","phieucham"]);
  }
}
