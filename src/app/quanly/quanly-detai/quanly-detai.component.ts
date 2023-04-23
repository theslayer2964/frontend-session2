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
              private userAuthService: UserAuthService) {
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

    }

}
