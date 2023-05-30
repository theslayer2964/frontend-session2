import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HockyService} from "../../shared-service/hocky.service";
import {PhieuChamService} from "../../quanly/quanly-service/phieu-cham.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-giangvien-lich',
  templateUrl: './giangvien-lich.component.html',
  styleUrls: ['./giangvien-lich.component.scss']
})
export class GiangvienLichComponent implements OnInit {

  constructor(private hockyService: HockyService, private phieuchamService: PhieuChamService,
              private userAuthService: UserAuthService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['stt','hodem', 'tenSV','gioitinh','ngaysinh','sdt','maNhom',"malop","action"];
  dataSource!: MatTableDataSource<any>;

  maGiangVien: any;
  ngOnInit(): void {
    this.getAllHocKy();
    this.maGiangVien =  this.userAuthService.getUserInfo().maGiangVien


    this.luaChonGroup = this.formBuilder.group({
      hocKy: ['', Validators.required]
    })
    this.getDsSvCuaGV(null, null, this.maGiangVien,null, null);
  }

  dsHocKy: HocKy[];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)

  }


  editProduct(row) {

  }

  private getDsSvCuaGV(hocKy: string, vaiTro: string[], maGiangVien: string, ppcham: string[],dotcham: string){
    this.phieuchamService.layDsSvDaChamDiemCuThe({
      hocKy: hocKy,
      ppcham:ppcham,
      dotCham: dotcham,
      vaitro: vaiTro,
      maNguoiDung: maGiangVien}).subscribe({
      next:(res:[]) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  // FORM BUILDER:
  luaChonGroup: FormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  fileterChange() {
    this.accordion.closeAll();
    console.log(this.luaChonGroup.value);
  }


  xuatFileExcel(dataSource: any) {

  }
}
