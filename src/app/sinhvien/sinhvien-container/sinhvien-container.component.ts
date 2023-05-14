import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {LichService} from "../../shared-service/lich/lich.service";
import {Subject} from "rxjs";
import {DkDetaiContainerTranferService} from "../../transfer-data-service/dk-detai-container-tranfer.service";

@Component({
    selector: 'app-sinhvien-container',
    templateUrl: './sinhvien-container.component.html',
    styleUrls: ['./sinhvien-container.component.css']
})
export class SinhvienContainerComponent implements OnInit {
    nhom: any;

    constructor(
        private router: Router,
        private userAuthService: UserAuthService,
        private lichService: LichService,
        private dkDetaiContainerTranferService: DkDetaiContainerTranferService) {
    }

    ngOnInit(): void {
        this.nhom = this.userAuthService.getUserInfo().nhom;
        this.validateLich();
        // coi lai
        this.dkDetaiContainerTranferService.dkDeTai_ContainerBehaviorSubject.subscribe(data => {
            this.validateLich();
        });
    }

    direct_SVGoTo(url: string) {
        if (url) {
            this.router.navigate([`${url}`])
        }
    }
    dsValidate: any
    validateNhom: any;
    validateDeTai: any;
    destroy$ = new Subject();
    destroy2$ = new Subject();
    private validateLich() {
        this.lichService.validateLich({
            vaiTro: this.userAuthService.getRoles()[0].roleName
        }).subscribe({
            next: (res) => {
                console.log("SV - LICH:", res);
                this.dsValidate = res;
                for (const data of this.dsValidate) {
                    if (data.tenKeHoach =='Lịch đăng ký nhóm') {
                        this.destroy$.next(data);
                        // this.validateNhom = data;
                    }
                    if (data.tenKeHoach == 'Lịch đăng ký đề tài') {
                        this.destroy2$.next(data);
                        // this.validateDeTai = data;
                    }
                }
            }, error: (err) => {
                console.log(err);
            }
        })
        this.destroy$.subscribe(data => {
            this.validateNhom = data;
            console.log("validateNhom", this.validateNhom);
        });
        this.destroy2$.subscribe(data => {
            this.validateDeTai = data;
            console.log("validateDeTai", this.validateDeTai);
        })
    }
}
