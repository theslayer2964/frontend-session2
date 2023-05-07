import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {PhieuChamService} from "../quanly-service/phieu-cham.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-quanly-ketquahoctap',
  templateUrl: './quanly-ketquahoctap.component.html',
  styleUrls: ['./quanly-ketquahoctap.component.scss']
})
export class QuanlyKetquahoctapComponent implements OnInit {
  displayedColumns: string[] = ['sttnhom','maSV', 'hoten','madetai', 'tendetai',"gvhd","duocraPB","diemGVHD", "pb1","pb2","tbbm","tvhd1","tvhd2","tbtvhd","ketqua","diembao","diemTK","hoidong","action"];
  dataSource!: MatTableDataSource<any>;
  dsHocKy: HocKy[];

  constructor(public dialog: MatDialog, private nhomService: NhomService, private hockyService: HockyService) {

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

  editProduct(row: any) {
    // this.nhomService.duyetNhom({
    //   ma: row.nhom.maNhom,
    //   trangThai: 1,
    //   maHocKy: this.hocKyHienTai
    // }).subscribe({
    //   next: (res) => {
    //     if (res) {
    //       this.getDsNhom()
    //       new NotificationsComponent().showNotification('success', 'Duyệt nhóm thành công');
    //     }
    //   },
    //   error: () => {
    //     console.log("Error")
    //     new NotificationsComponent().showNotification('success', 'Duyệt nhóm thất bại');
    //   }
    // })
  }

  deleteProduct(id) {

  }
  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)

    // this.getDsNhom();
  }
  tinhTrang: any;




  downloadFileSV() {
    console.log("XU LY TIP TUC...")
  }

}
