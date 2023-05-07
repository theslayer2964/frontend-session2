import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatDialog} from "@angular/material/dialog";
import {NhomService} from "../../shared-service/nhom.service";
import {HockyService} from "../../shared-service/hocky.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-quanly-lophocphan',
  templateUrl: './quanly-lophocphan.component.html',
  styleUrls: ['./quanly-lophocphan.component.scss']
})
export class QuanlyLophocphanComponent implements OnInit {
  displayedColumns: string[] = ['stt', 'maSV', 'hodem', 'ten',"gioitinh","ngaysinh","sdt", "nhom","action"];
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


  downloadFileSV() {
    console.log("XU LY TIP TUC...")
  }

}
