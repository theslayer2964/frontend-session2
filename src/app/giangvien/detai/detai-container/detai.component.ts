import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ThemDeTaiGvComponent} from "../../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {DetaiService} from "../detai-service/detai.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HockyService} from "../../../shared-service/hocky.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-detai',
  templateUrl: './detai.component.html',
  styleUrls: ['./detai.component.css']
})
export class DetaiComponent implements OnInit {
  private hocKyHienTai: any;
  constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService) {
  }

  ngOnInit(): void {
    this.getAllHocKy();
  }

  private getDSDeTaiTheoHK(hocKy: any) {
    this.detaiService.getDeTaiRoleGV(hocKy)
      .subscribe({
        next: (res) => {
          console.log("DS DE TAI:", res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.log("Error")
        }
      })
  }
  dsHocKy: HocKy[];
  private getAllHocKy(){
    this.hockyService.getHocKy().subscribe({next:(res) => {
      this.dsHocKy = res;
      },error: (err) => {
        console.log(err)
      }})
  }

  openDialog() {
    this.dialog.open(ThemDeTaiGvComponent, {}).afterClosed().subscribe(val => {
      if (val === "save") {
        this.getDSDeTaiTheoHK(this.hocKyHienTai)
      }
    })
  }

  editProduct(row: any) {
    this.dialog.open(ThemDeTaiGvComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === "update") {
        this.getDSDeTaiTheoHK(this.hocKyHienTai)
      }
    })
  }

  // Table
  displayedColumns: string[] = ['productName', 'category', 'seasons', "price", "comment", "date", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id: any) {
  this.detaiService.deleteDeTai(id).subscribe({
    next: (res) => {
      this.getDSDeTaiTheoHK(this.hocKyHienTai);
    },
    error: () => {
      console.log("Error")
    }
  })
  }

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value
    console.log($event.value)
    this.getDSDeTaiTheoHK($event.value);
  }
}
