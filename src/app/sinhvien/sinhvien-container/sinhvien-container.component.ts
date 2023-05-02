import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {LichService} from "../../shared-service/lich/lich.service";

@Component({
    selector: 'app-sinhvien-container',
    templateUrl: './sinhvien-container.component.html',
    styleUrls: ['./sinhvien-container.component.css']
})
export class SinhvienContainerComponent implements OnInit {

    nhom: any;

    haveNhom: any;

    constructor(
        private router: Router,
        private userAuthService: UserAuthService,
        private lichService: LichService
    ) {
    }

    ngOnInit(): void {
        this.nhom = this.userAuthService.getUserInfo().nhom;
        this.validateLich();
        this.haveNhom = this.nhom != null ? true : false;

    }

    goToSVChonNhom(url: string) {
        if (url) {
            this.router.navigate([`${url}`])
        }
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
                    if (data.tenKeHoach =='Lịch đăng ký nhóm') {
                        this.validateNhom = data;
                    }
                    if (data.tenKeHoach == 'Lịch đăng ký đề tài') {
                        this.validateDeTai = data;
                    }

                }
                console.log(this.validateDeTai.invalid);

            }, error: (err) => {
                console.log(err);
            }
        })
    }
}
