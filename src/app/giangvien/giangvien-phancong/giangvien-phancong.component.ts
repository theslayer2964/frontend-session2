import {Component, OnInit, ViewChild} from '@angular/core';
import {HockyService} from "../../shared-service/hocky.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {PhieuChamService} from "../../quanly/quanly-service/phieu-cham.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-giangvien-phancong',
  templateUrl: './giangvien-phancong.component.html',
  styleUrls: ['./giangvien-phancong.component.scss']
})
export class GiangvienPhancongComponent implements OnInit {

  constructor(private hockyService: HockyService, private phieuchamService: PhieuChamService,
              private userAuthService: UserAuthService,private formBuilder: FormBuilder) { }
  displayedColumns: string[] = ['maSV', 'tenSV', 'maNhom',"tenNhom", 'maDeTai',"gvhd","tenDeTai","diem","action"];
  dataSource!: MatTableDataSource<any>;

  maGiangVien: any;
  ngOnInit(): void {
    this.getAllHocKy();
    this.maGiangVien =  this.userAuthService.getUserInfo().maGiangVien


    this.luaChonGroup = this.formBuilder.group({
      hocKy: ['', Validators.required],
      dotCham: [''],
      ppcham: [''],
      vaitro: ['']
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

  downloadFileSV() {

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
        console.log("GV- CHAM DIEM:", res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  // FORM BUILDER:
  luaChonGroup: FormGroup;
  showThongTinHD: boolean = false;
  changeDotChamDiem($event: MatSelectChange) {
    if($event.value == "HoiDong"){
      this.showThongTinHD = true;
    }
    else{
      this.showThongTinHD = false;
      this.luaChonGroup.controls['ppcham'].setValue(['']);
      this.luaChonGroup.controls['vaitro'].setValue(['']);
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
          this.getDsSvCuaGV(this.luaChonGroup.controls['hocKy'].value == undefined ? null : this.luaChonGroup.controls['hocKy'].value,
              this.luaChonGroup.controls['vaitro'].value == "" ? null :this.luaChonGroup.controls['vaitro'].value ,
              this.maGiangVien, this.luaChonGroup.controls['ppcham'].value == "" ? null : this.luaChonGroup.controls['ppcham'].value,
              this.luaChonGroup.controls['dotCham'].value)
    // }
    // TH1: ko co hocKy -> cho HK moi nhat
    // TH2: dotcham -> HD, PB -> load
    // TH3: dotcham -> HoiDong
    // 3.1 ppcham -> POSTER
    //              -> Ra hoidong
    //              -> chon ca 2
    //              -> khong chon ca 2  -> ra: pp:'' vaitro:''
    //            -> Nếu thấy rối quá thì bỏ chỉ cho ngta chọn 1 thôi thì nói tao sửa lại
    // 3.2 vaitro -> chon 1:CT, TK, TV3
    //            -> chon 2:...
    //            -> chon 3:...
    //            -> khong chon -> ra: ''
    //            -> Nếu thấy rối quá thì bỏ chỉ cho ngta chọn 1 thôi thì nói tao sửa lại

  }
}
