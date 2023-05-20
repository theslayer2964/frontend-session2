import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {SinhvienService} from "../../shared-service/sinhvien.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatAccordion} from "@angular/material/expansion";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {QlDiemBaoComponent} from "../../dialog/ql-diem-bao/ql-diem-bao.component";

@Component({
  selector: 'app-quanly-ketquahoctap',
  templateUrl: './quanly-ketquahoctap.component.html',
  styleUrls: ['./quanly-ketquahoctap.component.scss']
})
export class QuanlyKetquahoctapComponent implements OnInit {
  displayedColumns: string[] = ['sttnhom','maSV', 'hoten','madetai', 'tendetai',"gvhd","duocraPB","diemGVHD", "pb1","pb2","tbbm","tvhd1","tvhd2","tbtvhd","ketqua","diembao","diemTK","hoidong","action"];
  dataSource!: MatTableDataSource<any>;
  dsHocKy: HocKy[];

  constructor(public dialog: MatDialog, private nhomService: NhomService, private hockyService: HockyService,
              private userAuthService: UserAuthService,private formBuilder: FormBuilder,
              private sinhvienService: SinhvienService) {

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
  maGiangVien: any;
  ngOnInit(): void {
    this.getAllHocKy();
    this.maGiangVien =  this.userAuthService.getUserInfo().maGiangVien
    this.luaChonGroup = this.formBuilder.group({
      hocKy: ['', Validators.required],
      giangvienCham:['']
    })
    this.layKetQua();

  }

  layKetQua() {
    this.sinhvienService.getKetQuaHocTapToanBoSV(this.hocKyHienTai).subscribe((res:any) =>{
      console.log("QL - KQHT:", res);
      let dsKQ:any = [];
      let i = 1;
      res.forEach(sv => {
        dsKQ.push({
          'sttnhom':i,
          'maSV': sv.maSV,
          'hoten':sv.tenSV,
          'madetai':sv.maDeTai,
          'tendetai':sv.tenDeTai,
          "gvhd":sv.gvhd,
          "duocraPB": sv.duocRaPB,
          "diemGVHD": sv.phieuChamDiemHD.diemPhieuCham,
          "pb1": sv.phieuChamDiemPB1.diemPhieuCham,
          "pb2": sv.phieuChamDiemPB1.diemPhieuCham,
          "tbbm": sv.diemTBBM,
          "tvhd1": sv.phieuChamDiemCT.diemPhieuCham,
          "tvhd2": sv.phieuChamDiemTK.diemPhieuCham,
          "tbtvhd": (sv.phieuChamDiemCT.diemPhieuCham + sv.phieuChamDiemTK.diemPhieuCham)/2 > 8 ?
              (sv.phieuChamDiemCT.diemPhieuCham + sv.phieuChamDiemTK.diemPhieuCham)/2 : 8  ,
          "ketqua": sv.ketQua,
          "diembao": sv.diembao != 0 ? sv.diembao : "---",
          "diemTK": sv.diemTK,
          "hoidong":  sv.diemTBBM >= 8 ? "HD" : "---"
        })
        i++;
      })
      this.dataSource = new MatTableDataSource(dsKQ);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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

  addDiemBao(row: any) {
    this.dialog.open(QlDiemBaoComponent, {
      data:row
    }).afterClosed().subscribe(res => {
      this.layKetQua();
    });
  }

  deleteProduct(id) {

  }
  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)
  }
  tinhTrang: any;

  downloadFileSV() {
    console.log("XU LY TIP TUC...")
  }
///
  // FORM BUILDER:
  luaChonGroup: FormGroup;
  phuongPhapList: any[] = [{value:'chamPoster',viewValue:"Poster"},{value: 'chamHoiDong', viewValue: "Được Hội Đồng"}];
  dsVaiTro: any[] = [
    {value: "CT", viewValue:"Chủ tịch hội đồng" },
    {value: "TK", viewValue:"Thư ký hướng dẫn" },
    {value: "TV3", viewValue:"Thành viên thứ 3" },
  ];

  @ViewChild(MatAccordion) accordion: MatAccordion;

  fileterChange() {
    this.accordion.closeAll();
    console.log(this.luaChonGroup.value);
    // this.getDsSvCuaGV(this.luaChonGroup.controls['hocKy'].value == undefined ? null : this.luaChonGroup.controls['hocKy'].value,
    //     this.luaChonGroup.controls['vaitro'].value == "" ? null :this.luaChonGroup.controls['vaitro'].value ,
    //     this.maGiangVien, this.luaChonGroup.controls['ppcham'].value == "" ? null : this.luaChonGroup.controls['ppcham'].value,
    //     this.luaChonGroup.controls['dotCham'].value)
  }

  dsGV: any[]
  changeGVCham($event: MatSelectChange) {

  }
}
