import {Component, OnInit, ViewChild} from '@angular/core';
import {HockyService} from "../../shared-service/hocky.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-giangvien-phancong',
  templateUrl: './giangvien-phancong.component.html',
  styleUrls: ['./giangvien-phancong.component.scss']
})
export class GiangvienPhancongComponent implements OnInit {

  constructor(private hockyService: HockyService) { }
  displayedColumns: string[] = ['maSV', 'hoten', 'email', 'maDeTai',"GVHD","tenDeTai","diem","action"];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllHocKy();
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

  changeVaiTro($event: MatSelectChange) {
    
  }

  editProduct(row) {
    
  }
}
