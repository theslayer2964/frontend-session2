import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ThemNhomComponent} from "../../dialog/them-nhom/them-nhom.component";
import {MatSelectChange} from "@angular/material/select";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";

@Component({
  selector: 'app-quanly-nhom',
  templateUrl: './quanly-nhom.component.html',
  styleUrls: ['./quanly-nhom.component.scss']
})
export class QuanlyNhomComponent implements OnInit {
  displayedColumns: string[] = ['maNhom', 'maDeTai', 'sv1', 'sv2', "danhGia","action"];
  dataSource!: MatTableDataSource<any>;
  dsHocKy: HocKy[];

  constructor(public dialog: MatDialog, private nhomService: NhomService, private hockyService: HockyService,
              private userAuthService: UserAuthService) {

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
    console.log("PAREN TO CHILD:", this.validateNhom);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  impType: any;
  selected: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
   this.nhomService.duyetNhom({
     ma: row.nhom.maNhom,
     trangThai: 1,
     maHocKy: this.hocKyHienTai
   }).subscribe({
     next: (res) => {
       if (res) {
         this.getDsNhom()
         new NotificationsComponent().showNotification('success', 'Duyệt nhóm thành công');
       }
     },
     error: () => {
       console.log("Error")
       new NotificationsComponent().showNotification('success', 'Duyệt nhóm thất bại');
     }
   })
  }

  deleteProduct(id) {

  }
  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)

    this.getDsNhom();
  }
  tinhTrang: any;
  private getDsNhom() {
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
    this.nhomService.getNhomRoleGV({
      maHocKy: this.hocKyHienTai,
      soHocKy: this.soHocKy,
      trangThai: this.tinhTrang
    })
        .subscribe({
          next: (res) => {
            if (res) {
              res.forEach( data => {
                var temp;
                temp = data.dsMaSinhVien;
                console.log("TEMP:", temp)
                delete data['npm it pdsMaSinhVien'];
                data.sv1 = temp[0];
                if(temp.length == 2 ){
                data.sv2 = temp[1];
                }
              });
              console.log("DATA REMAKE ne: ", res)
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

  // Table
  @Input() validateNhom:any;

  changeTinhTrang($event: MatSelectChange) {
    this.tinhTrang = $event.value
    this.getDsNhom();
  }
}
