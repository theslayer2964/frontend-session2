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

@Component({
  selector: 'app-giangvien-chamdiem',
  templateUrl: './giangvien-chamdiem.component.html',
  styleUrls: ['./giangvien-chamdiem.component.scss']
})
export class GiangvienChamdiemComponent implements OnInit {

  constructor(public dialog: MatDialog, private hockyService: HockyService, public userAuthService: UserAuthService,
              private giangvienService: GiangvienService, private gvDialogChamDiemTransfer: GvDialogchamdiemService) { }
  maGiangVien: any;
  ngOnInit(): void {
    this.maGiangVien  = this.userAuthService.getUserInfo().maGiangVien
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
  displayedColumns: string[] = ["maNhom","tenNhom", 'maDeTai',"tenDeTai", 'maSV1', 'tenSV1','maSV2','tenSV2',"action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    console.log("EDIT NE");
    this.dialog.open(GvChamdiemComponent, {
      data: row,
      width:"1150px"
    }).afterClosed().subscribe(res => {
      this.getDSTheoVaiTro();
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

  dsVaiTro: any[] = [
    {value: "HD", viewValue:"Giảng viên hướng dẫn" },
    {value: "PB", viewValue:"Giảng viên phản biện" },
    {value: "CT", viewValue:"Chủ tịch hội đồng" },
    {value: "TK", viewValue:"Thư ký hướng dẫn" },
  ];
  vaitro:any;
  dsSV:any;
  changeVaiTro($event: MatSelectChange) {
    this.vaitro = $event.value;
    console.log("VAI TRO:", this.vaitro);
    this.gvDialogChamDiemTransfer.sendVaiTro(this.vaitro);
    if(this.hocKyChon!=null && this.vaitro!=null){
      this.getDSTheoVaiTro();
    }
  }

  getDSTheoVaiTro(){
    this.giangvienService.getDSSVTheoHKVaVaiTro(this.hocKyChon, this.vaitro, this.maGiangVien).subscribe(res => {
      this.dsSV = res;
      console.log("RES", res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
