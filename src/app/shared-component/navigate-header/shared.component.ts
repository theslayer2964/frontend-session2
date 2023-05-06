import {Component, OnInit} from '@angular/core';
import {UserService} from "../../authentication/_service/user.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangepasswordComponent} from "../../authentication/changepassword/changepassword.component";
import {ThongbaoComponent} from "../../dialog/thongbao/thongbao.component";
import {TinnhanService} from "../../shared-service/tinnnhan.service";

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
    public defaultImage: any = './assets/image/logo_iuh.png'
    thongbaoMoi: number;

    constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService,
                public userDataService: UserDataService,
                public dialog: MatDialog,
                private tinNhanService: TinnhanService) {
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
        this.loadThongBao();
        this.thongbaoMoi = 5;
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

    openDialog() {
        this.dialog.open(ChangepasswordComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {

            }
        })
    }

    hidden = false;
    listData: any = [
        {tinnhan:"Yeu cau ket ban", id:1, read:true, createdAt:"20/1/2022", sender:"19473331", reciver:""},
        {tinnhan:"Huy ket ban", id:2,read:false, createdAt:"20/1/2022", sender:"19473331"}
    ];

    showThongBao(item: any) {
        this.dialog.open(ThongbaoComponent, {
            data:item,
            width:"850px"
        })
        //     .afterClosed().subscribe(val => {
        //     this.router.
        // })
    }

    loadThongBao() {
        let roleName = this.userAuthService.getRoles()[0].roleName;
        let maNguoiDung = "";
        if (roleName == 'ROLE_GIANGVIEN' ||  roleName == 'ROLE_QUANLY') {
            maNguoiDung = this.userAuthService.getUserInfo().maGiangVien
        } else {
            maNguoiDung = this.userAuthService.getUserInfo().maSinhVien
        }
        if (maNguoiDung != "") {
            this.tinNhanService.layTinNhan(maNguoiDung)
                .subscribe(res => {
                    console.log("TIN NHẮN:",res);
                    res.forEach(data => {
                        this.listData.push({
                            tinnhan: data.noiDung,
                            id: data.id,
                            sender: data.nguoiGui.maGiangVien,
                            createdAt: new Date(data.createdAt),
                            read: data.trangThai
                        });
                    })
                })
        }

    }
}
