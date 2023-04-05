import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {NhomSvService} from "../../sinhvien-service/nhom-sv.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {HockyService} from "../../../shared-service/hocky.service";

@Component({
  selector: 'app-sinhvien-chonnhom',
  templateUrl: './sinhvien-chonnhom.component.html',
  styleUrls: ['./sinhvien-chonnhom.component.css']
})
export class SinhvienChonnhomComponent implements OnInit {
  displayedColumns: string[] = ['nhom', 'sv1', 'sv2', "tinhTrang",  "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dsHocKy: HocKy[];

  // @ts-ignore
  constructor(public dialog: MatDialog, private nhomSVService: NhomSvService,
              private hockyService: HockyService,
              private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    // this.getNhomSV()
    this.getAllHocKy();
  }

    applyFilter($event: KeyboardEvent) {

    }

  openDialog() {

  }

  editProduct(row) {

  }

  deleteProduct(id) {

  }

  private getNhomSV() {
    this.nhomSVService.getNhomSV()
        .subscribe({
          next: (res) => {
            console.log("SV- CHONHOM: ", res)
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            console.log("Error")
          }
        })
  }
  private hocKyHienTai: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value
    console.log($event.value)
    // this.getDSDeTaiTheoHK($event.value);
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
}
