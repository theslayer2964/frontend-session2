import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../../shared-service/hocky.service";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {QlThemgvpbComponent} from "../../../dialog/ql-themgvpb/ql-themgvpb.component";
import {NhomService} from "../../../shared-service/nhom.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-ql-pc-gvpb',
  templateUrl: './ql-pc-gvpb.component.html',
  styleUrls: ['./ql-pc-gvpb.component.scss']
})
export class QlPcGvpbComponent implements OnInit {
  private hocKyHienTai: any;
  private soHocKy: any;

  constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
              private userAuthService: UserAuthService, private nhomService: NhomService) {
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3);
    this.soHocKy = $event.value.toString().slice(2);
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
     this.nhomService.getDSNhomDePhanCongGVPhanBien({maHocKy: this.hocKyHienTai, soHocKy: this.soHocKy})
         .subscribe(res => {
           this.dataSource = new MatTableDataSource(this.mappingData(res));
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
         });
  }
  mappingData(res: any){
    var temp;
    res.forEach(data => {
      temp = data.dsMaSinhVien;
      delete data['dsMaSinhVien']
      data.maSV1 = Object.keys(temp)[0];
      data.tenSV1 = Object.values(temp)[0];
      if(Object.keys(temp).length == 2){
        data.maSV2 = Object.keys(temp)[1]
        data.tenSV2 = Object.values(temp)[1]
      }
    })
    return res;
  }

  applyFilter($event: KeyboardEvent) {

  }

  // Table
  displayedColumns: string[] = ["maNhom","tenNhom","maDeTai","tenDeTai","maSV1","tenSV1","maSV2","tenSV2","tenGiangVienHD","GVPB1","GVPB2","action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {

  }

  deleteProduct(maDeTai: any) {

  }

  openDialog() {
    this.dialog.open(QlThemgvpbComponent, {}).afterClosed().subscribe(val => {
      if (val === "save") {
        // this.(this.hocKyHienTai, this.soHocKy);
        // LÀM TÍP
      }
    })
  }
}