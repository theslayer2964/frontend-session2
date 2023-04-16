import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserAuthService} from "../../authentication/_service/user-auth.service";

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
        private userAuthService: UserAuthService
    ) {
    }

    ngOnInit(): void {
        this.nhom = this.userAuthService.getUserInfo().nhom;
        this.haveNhom = this.nhom != null ? true : false;
    }

    goToSVChonNhom(url: string) {
        if (url) {
            this.router.navigate([`${url}`])
        }
    }
}
