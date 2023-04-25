import { Component, OnInit } from '@angular/core';
import {HocKy} from "../../shared-service/HocKy.models";
import {HockyService} from "../../shared-service/hocky.service";
import {MatSelectChange} from "@angular/material/select";
import {LichService} from "../../shared-service/lich/lich.service";

@Component({
  selector: 'app-ql-kltn',
  templateUrl: './ql-kltn.component.html',
  styleUrls: ['./ql-kltn.component.scss']
})
export class QlKltnComponent implements OnInit {

  dsHocKy: HocKy[];

  constructor(private hocKyService: HockyService, private lichServer: LichService) { }

  ngOnInit(): void {
    this.getAllHocKy();
  }
  private getAllHocKy() {
    this.hocKyService.getHocKy().subscribe({
      next: (res) => {
        this.dsHocKy = res;
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  private hocKyHienTai: any;
  private soHocKy: any;

  changeHocKy($event: MatSelectChange) {
    this.hocKyHienTai = $event.value.toString().slice(0, 3)
    this.soHocKy = $event.value.toString().slice(2)

    this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_GIANGVIEN").subscribe({
          next: (res) => {
            // this.dsKeHoachGV = res
          }
        }
    )
    this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_SINHVIEN").subscribe({
          next: (res) => {
            // this.dsKeHoachSV = res
          }
        }
    )
  }
}
