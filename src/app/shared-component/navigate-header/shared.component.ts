import {Component, OnInit} from '@angular/core';
import {UserService} from "../../authentication/_service/user.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {Router} from "@angular/router";
import {UserDataService} from "../../shared-service/userData.service";
import {MatDialog} from "@angular/material/dialog";
import {ChangepasswordComponent} from "../../authentication/changepassword/changepassword.component";
import {ThongbaoComponent} from "../../dialog/thongbao/thongbao.component";
import {TinnhanService} from "../../shared-service/tinnnhan.service";
import {LoginNotificationService} from "../../transfer-data-service/login-notification.service";

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
    public defaultImage: any = './assets/image/logo_iuh.png'
    thongbaoMoi: number = 0;

    constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService,
                public userDataService: UserDataService,
                public dialog: MatDialog,
                private tinNhanService: TinnhanService, private loginNotificationService: LoginNotificationService) {
    }

    public userInfo: any

    ngOnInit(): void {
        if (this.userAuthService.getUserInfo()) {
            this.userInfo = this.userAuthService.getUserInfo();
            console.log("INFO: ", this.userInfo);
        }
        this.userDataService.userBehaviorSubject.subscribe(data => {
            if (data) {
                this.userInfo = data;
            }
        });
        this.loginNotificationService.loginNotiSubject.subscribe(res => {
            this.loadThongBao();
        })
    }

    public isLoggedIn() {
        return this.userAuthService.isLoggerIn();
    }

    public logout() {
        this.userAuthService.clean();
        this.router.navigate([''])
    }

    login() {
        this.router.navigate(['login'])
    }

    openDialog() {
        this.dialog.open(ChangepasswordComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {

            }
        })
    }

    hidden = false;
    listData: any = [];

    showThongBao(item: any) {

        item.trangThai = 1;
        this.tinNhanService.docTinNhan(item).subscribe(res => {
            this.dialog.open(ThongbaoComponent, {
                data: item,
                width: "850px"
            })
        });
        //     .afterClosed().subscribe(val => {
        //     this.router.
        // })
    }

    loadThongBao() {
        let roleName = "";
        if (this.userAuthService.getRoles() != null) {
            roleName = this.userAuthService.getRoles()[0].roleName;
        }

        let maNguoiDung = "";
        let tin: any;
        if (roleName == 'ROLE_GIANGVIEN' || roleName == 'ROLE_QUANLY') {
            maNguoiDung = this.userAuthService.getUserInfo().maGiangVien
            this.tinNhanService.layTinNhan(maNguoiDung)
                .subscribe(res => {
                    tin = res;
                    this.listData = [];
                    tin.tinNhanDtos.forEach(data => {
                        this.listData.push({
                            tinnhan: data.tenTinNhan,
                            id: data.id,
                            sender: data.nguoiGui.maGiangVien,
                            createdAt: new Date(data.createdAt),
                            read: data.trangThai,
                            info: data
                        });
                    })
                    this.thongbaoMoi = tin.thongBaoChuaDoc;
                })
        } else {
            if (this.userAuthService.getUserInfo().maSinhVien != null) {
                maNguoiDung = this.userAuthService.getUserInfo().maSinhVien

                this.tinNhanService.layTinNhan(maNguoiDung)
                    .subscribe(res => {
                        tin = res;
                        this.listData = [];
                        tin.tinNhanDtos.forEach(data => {
                            if ( data.tenTinNhan == 'Bạn có tin nhắn từ người quản lý' ||
                                data.tenTinNhan == 'Giảng viên đã chấp nhận hướng dẫn đề tài mà bạn yêu cầu' ) {
                                console.log(data)
                                this.listData.push({
                                    tinnhan: data.tenTinNhan,
                                    id: data.id,
                                    sender: data.nguoiGui.maGiangVien,
                                    createdAt: new Date(data.createdAt),
                                    read: data.trangThai,
                                    info: data
                                });
                            } else {
                                this.listData.push({
                                    tinnhan: data.tenTinNhan,
                                    id: data.id,
                                    sender: data.nguoiGui.maSinhVien,
                                    createdAt: new Date(data.createdAt),
                                    read: data.trangThai,
                                    info: data
                                });
                            }

                        })
                        this.thongbaoMoi = tin.thongBaoChuaDoc;
                    })
            }
        }
    }
}
