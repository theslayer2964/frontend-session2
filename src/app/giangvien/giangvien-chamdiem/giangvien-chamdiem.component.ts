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
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-giangvien-chamdiem',
  templateUrl: './giangvien-chamdiem.component.html',
  styleUrls: ['./giangvien-chamdiem.component.scss']
})
export class GiangvienChamdiemComponent implements OnInit {

  constructor(public dialog: MatDialog, private hockyService: HockyService, public userAuthService: UserAuthService,
              private giangvienService: GiangvienService, private gvDialogChamDiemTransfer: GvDialogchamdiemService,
              private formBuilder: FormBuilder) { }
  maGiangVien: any;


  ngOnInit(): void {
    this.maGiangVien  = this.userAuthService.getUserInfo().maGiangVien
    this.getAllHocKy();

    this.luaChonGroup = this.formBuilder.group({
      hocKy: ['', Validators.required],
      dotCham: [''],
      ppcham: [''],
      vaitro: ['']
    })
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
    this.getDSTheoVaiTro($event.value, null, this.maGiangVien);
  }

  // Table
  displayedColumns: string[] = ["maNhom","tenNhom", 'maDeTai',"tenDeTai", 'maSV1', 'tenSV1','maSV2','tenSV2',"vaiTro","action"];
  dataSource!: MatTableDataSource<any>;

  editProduct(row) {
    this.dialog.open(GvChamdiemComponent, {
      data: row,
      width:"1150px"
    }).afterClosed().subscribe(res => {
      this.getDSTheoVaiTro(this.hocKyChon, this.vaitro, this.maGiangVien);
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
  vaitro:any;
  dsSV:any;

  getDSTheoVaiTro(hocKy: string, vaiTro: string, maGiangVien: string){
    this.giangvienService.getDSSVTheoHKVaVaiTro(hocKy, vaiTro, maGiangVien).subscribe(res => {
      this.dsSV = res;
      console.log("RES", res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  // FORM TIM KÍM:
  luaChonGroup: FormGroup;
  showThongTinHD: boolean = false;
  changeDotChamDiem($event: MatSelectChange) {
    if($event.value == "HoiDong"){
      this.showThongTinHD = true;
    }
    else{
      this.showThongTinHD = false;
      this.luaChonGroup.controls['ppcham'].setValue('');
      this.luaChonGroup.controls['vaitro'].setValue('');
    }
  }
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
    // TH1: ko co hocKy -> cho HK moi nhat
    // TH2: dotcham -> HD, PB -> load
    // TH3: dotcham -> HoiDong
    // 3.1 ppcham -> POSTER
    //              -> Ra hoidong
    //              -> chon ca 2
    //              -> khong chon ca 2  -> ra:['']
    //            -> Nếu thấy rối quá thì bỏ chỉ cho ngta chọn 1 thôi thì nói tao sửa lại
    // 3.2 vaitro -> chon 1:CT, TK, TV3
    //            -> chon 2:...
    //            -> chon 3:...
    //            -> khong chon -> ra: ['']
    //            -> Nếu thấy rối quá thì bỏ chỉ cho ngta chọn 1 thôi thì nói tao sửa lại
  }
}
