import {Component, OnInit} from '@angular/core';
import {UserService} from "../../authentication/_service/user.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
    public defaultImage: any = './assets/image/logo_iuh.png'

    constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService,
                public userDataService: UserDataService) {
    }

    public userInfo: any

    ngOnInit(): void {
        if (this.userAuthService.getUserInfo()) {
            this.userInfo = this.userAuthService.getUserInfo();
            console.log("INFO: ", this.userInfo);
        }
        this.userDataService.userBehaviorSubject.subscribe(data => {
            if (data) {
                console.log("LAN 1")
                this.userInfo = data;
            }
        })
    }

    public isLoggedIn() {
        return this.userAuthService.isLoggerIn();
    }

    public logout() {
        this.userAuthService.clean();
        console.log("LOGOUT")
        this.router.navigate([''])
    }

    login() {
        console.log("LOGIN")
        this.router.navigate(['login'])
    }
}
