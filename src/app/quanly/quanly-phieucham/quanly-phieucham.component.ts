import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {ThemPhieuChamMauComponent} from "../../dialog/them-phieu-cham-mau/them-phieu-cham-mau.component";
import {DialogExcelQlSinhvienComponent} from "../../excel/dialog-excel-ql-sinhvien/dialog-excel-ql-sinhvien.component";
import {TieuchichamdiemService} from "../../shared-service/tieuchichamdiem.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DS_Nhom_KLTN} from "../../shared-service/FileNameExport";
import {FileGeneratorService} from "../../shared-service/file-generator.service";

interface GiangVien {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quanly-phieucham',
  templateUrl: './quanly-phieucham.component.html',
  styleUrls: ['./quanly-phieucham.component.scss']
})
export class QuanlyPhieuchamComponent implements OnInit {

  constructor(public dialog: MatDialog, private hockyService: HockyService,
              private tieuChiChamDiem: TieuchichamdiemService,
              private userAuthService: UserAuthService, private router: Router,
              private fileGenerate: FileGeneratorService) { }
  ngOnInit(): void {
  }

  dsHocKy: HocKy[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private hocKyHienTai: any;
  private soHocKy: any;
  dsVaiTro: GiangVien[] = [
    {value: "HD", viewValue:"Giảng viên hướng dẫn" },
    {value: "PB", viewValue:"Giảng viên phản biện" },
    {value: "CT", viewValue:"Chủ tịch hội đồng" },
    {value: "TK", viewValue:"Thư ký hướng dẫn" },
  ];

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
    // this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
  }

  nhapDiemExcel() {

  }

  themPhieuChamDiem() {
    this.dialog.open(ThemPhieuChamMauComponent,{
      width:"1000px"
    })
  }

  xuatFileExcel() {

  }

  applyFilter($event: KeyboardEvent) {
    
  }

  directTieuChiCham() {
    this.router.navigate(["/quanly","tieuchicham"])
  }

    changeGiangVien($event: MatSelectChange) {
      console.log("Giá tri dc chon:", $event.value);
      this.tieuChiChamDiem.layHetPhieuChamMau($event.value).subscribe({
        next: (res) => {
          if(res.length > 0){
            var tieuChis = res[0].tieuChiChamDiems
            this.dataSource = new MatTableDataSource(tieuChis);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else
            this.dataSource = new MatTableDataSource(null);
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  // Table
  displayedColumns: string[] = ["maTieuChiCham","tenTieuChiCham","diemToiDa" ,"action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    
  }



  deleteProduct(maDeTai: any) {
    
  }

  downloadFileSV() {
    this.tieuChiChamDiem.getKetQuaTrongHocKy().subscribe(res => {
      this.fileGenerate.generateFile(DS_Nhom_KLTN, res['body'], 'xlsx');
    });
  }
}
