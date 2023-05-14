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
import {ThemSvComponent} from "../../dialog/them-sv/them-sv.component";
import {ThemgvComponent} from "../../dialog/themgv/themgv.component";
import {
  DialogExcelQlGiangvienComponent
} from "../../excel/dialog-excel-ql-giangvien/dialog-excel-ql-giangvien.component";
import {GiangvienService} from "../../shared-service/giangvien.service";
import {FileGeneratorService} from "../../shared-service/file-generator.service";

@Component({
  selector: 'app-quanly-giangvien',
  templateUrl: './quanly-giangvien.component.html',
  styleUrls: ['./quanly-giangvien.component.scss']
})
export class QuanlyGiangvienComponent implements OnInit {
  private hocKyHienTai: any;
  private soHocKy: any;

  constructor(public dialog: MatDialog, private giangVienService: GiangvienService,
              private userAuthService: UserAuthService,  private filegenerate: FileGeneratorService) {
  }

  ngOnInit(): void {
    this.getAllGiangVien();
  }

  dsHocKy: HocKy[];

  // 1. STEP 1
  private getAllGiangVien() {
    this.giangVienService.getGiangVien().subscribe({
      next: (res) => {
        this.dsHocKy = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  openDialog() {
    this.dialog.open(ThemgvComponent, {}).afterClosed().subscribe(val => {
      if (val === "save") {
        this.getAllGiangVien();
      }
    })
  }

  editProduct(row: any) {
    this.dialog.open(ThemgvComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === "update") {
        this.getAllGiangVien();
      }
    })
  }

  // Table
  displayedColumns: string[] = [
    "maGiangVien","anhDaiDien", "tenGiangVien","cmnd","email","gioiTinh","hocVi","namCongTac","ngaySinh",
    "soDienThoai","maKhoa","action"
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

  @Input() validateDeTai;


  downloadFileSV() {
    this.giangVienService.xuatfileMauGV().subscribe(res => {
      this.filegenerate.generateFile("File_Mau_Giang_Vien", res['body'], 'xlsx');
      new NotificationsComponent().showNotification('success', 'Xuất file excel thành công');
    });

  }

  openExcel() {
    this.dialog.open(DialogExcelQlGiangvienComponent,{
      width:"650px"
    }).afterClosed().subscribe(() => {
      this.getAllGiangVien();
    })
  }
}
