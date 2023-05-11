import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";
import {LopHocPhanService} from "../../shared-service/lop-hoc-phan.service";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {ThemgvComponent} from "../../dialog/themgv/themgv.component";
import {ThemLopHocPhanComponent} from "../../dialog/them-lop-hoc-phan/them-lop-hoc-phan.component";
import {DialogExportExcelComponent} from "../../excel/dialog-export-excel/dialog-export-excel.component";
import {DS_Nhom_KLTN_RA_HD_POSTER} from "../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../shared-service/file-generator.service";

@Component({
  selector: 'app-quanly-lophocphan',
  templateUrl: './quanly-lophocphan.component.html',
  styleUrls: ['./quanly-lophocphan.component.scss']
})
export class QuanlyLophocphanComponent implements OnInit {
  displayedColumns: string[] = [ "maSinhVien","tenSinhVien","dienThoai","email","gioiTinh", "ngaySinh",
    "maLopDanhNghia","maNhom","action"];
  dataSource!: MatTableDataSource<any>;
  dsHocKy: HocKy[];

  dsLop: any[];

  constructor(public dialog: MatDialog,
              private lopHocPhanService: LopHocPhanService,
              private hockyService: HockyService,
              private sinhVienService: SinhvienService,
              private filegenerate: FileGeneratorService) {

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

  private getAllLopHP() {
    this.lopHocPhanService.layDsLop().subscribe({
      next: (res) => {
        this.dsLop = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.getAllHocKy();
    this.getAllLopHP();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  impType: any;
  selected: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {

  }

  deleteProduct(id) {

  }
  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)
    this.sinhVienService.lyaDsSinhVienLop({
      maHocKy: this.hocKyHienTai
    }).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  changeLopHP($event: MatSelectChange) {
    this.sinhVienService.lyaDsSinhVienLop({
      maLopHocPhan: $event.value
    }).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  tinhTrang: any;

  // Table
  @Input() validateNhom:any;


  themLopHP() {
    this.dialog.open(ThemLopHocPhanComponent, {}).afterClosed().subscribe(val => {
      if (val === "save") {
        this.getAllLopHP();
      }
    })
  }

  exportFileLop() {
    this.dialog.open(DialogExportExcelComponent, {data: {variable: "hocPhan", ma: null}}).afterClosed().subscribe(
        val => {
          if (val.ma != null && val.ma != undefined && val.ma != "") {
            this.sinhVienService.xuatDsSinhVienLopHocPhan({maLopHocPhan: val.ma}).subscribe(res => {
              this.filegenerate.generateFile(DS_Nhom_KLTN_RA_HD_POSTER, res['body'], 'xlsx');
              new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
            });
          } else {
            new NotificationsComponent().showNotification('danger', 'Hãy Chọn Lơớp Học Phần');
          }
    })
  }
}
