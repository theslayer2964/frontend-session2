import { Component, OnInit } from '@angular/core';
import {LichService} from "../../shared-service/lich/lich.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

@Component({
  selector: 'app-tab-nav',
  templateUrl: './tab-nav.component.html',
  styleUrls: ['./tab-nav.component.css']
})
export class TabNavComponent implements OnInit {

  constructor(
      private lichService: LichService,
      private userAuthService: UserAuthService,
  ) { }

  ngOnInit(): void {
    this.validateLich();
  }
  dsValidate: any
  validateNhom: any;
  validateDeTai: any;
  private validateLich() {
    this.lichService.validateLich({
      vaiTro: this.userAuthService.getRoles()[0].roleName
    }).subscribe({
      next: (res) => {
        this.dsValidate = res;
        for (const data of this.dsValidate) {
          if (data.tenKeHoach =='Đăng ký nhóm') {
            this.validateNhom = data;
          }
          if (data.tenKeHoach == 'Cập nhật tên đề tài') {
            this.validateDeTai = data;
          }

        }
        console.log(this.validateNhom );

      }, error: (err) => {
        console.log(err);
      }
    })
  }

}
