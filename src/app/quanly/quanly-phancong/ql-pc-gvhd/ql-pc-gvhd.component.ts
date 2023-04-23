import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../../shared-service/hocky.service";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ql-pc-gvhd',
  templateUrl: './ql-pc-gvhd.component.html',
  styleUrls: ['./ql-pc-gvhd.component.scss']
})
export class QlPcGvhdComponent implements OnInit {
  private hocKyHienTai: any;
  private soHocKy: any;

  constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
              private userAuthService: UserAuthService) {
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

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3);
    this.soHocKy = $event.value.toString().slice(2);
    console.log('XXX:', this.hocKyHienTai, this.soHocKy);
  }

  applyFilter($event: KeyboardEvent) {

  }

  // Table
  displayedColumns: string[] = ["maNhom","tenNhom","maDeTai","tenDeTai","maSV1","tenSV1","maSV2","tenSV2","GVHD","GVPB1","GVPB2","action"];
  dataSource!: MatTableDataSource<any>;

}
