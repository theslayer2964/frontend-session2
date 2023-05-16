import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {HockyService} from "../../shared-service/hocky.service";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {DeTai} from "../../giangvien/detai/DeTai.models";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {Nhom} from "../../sinhvien/Nhom.models";
import {NhomService} from "../../shared-service/nhom.service";
import {catchError, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-them-nhom',
    templateUrl: './them-nhom.component.html',
    styleUrls: ['./them-nhom.component.scss']
})
export class ThemNhomComponent implements OnInit {

    actionBtn: string = "Save";

    dsDeTai: DeTai[];

    dsMaSinhVien: any[] = [];

    sinhVienRole: any;

    maSinhVien1;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
                private detaiService: DetaiService,
                private hocKyService: HockyService,
                private userAuthService: UserAuthService,
                private nhomService: NhomService,
                private dialogRef: MatDialogRef<ThemNhomComponent>,
                @Inject(MAT_DIALOG_DATA) public editData: any) {
    }

    ngOnInit(): void {
        this.sinhVienRole = this.userAuthService.getRoles()[0].roleName == 'ROLE_SINHVIEN' ? true : false;
        if (this.sinhVienRole == true) {
            this.maSinhVien1 = this.userAuthService.getUserInfo().maSinhVien;
        }
        this.formNhom = this.formBuilder.group({
            maSoSv1: ['', Validators.required],
            maSoSv2: [''],

        })
        console.log(this.editData)
        if (this.editData) {
            // this.productForm.controls['maDeTai'].setValue(this.editData.maDeTai);
            // this.formNhom.controls['maSoSv1'].setValue(this.editData.dsMaSinhVien[0]);
            // this.formNhom.controls['maSoSv2'].setValue(this.editData.dsMaSinhVien[1]);
            // this.maSinhVien1.setValue(this.editData.dsMaSinhVien[0])
            // this.formNhom.controls['maSoSv2'].setValue(this.editData.dsMaSinhVien[1]);
            // this
            this.actionBtn = "Update"
        }
        if (this.sinhVienRole == false) {
            // this.hocKyService.getHocKyMoiNhat().subscribe({
            //     next: (res) => {
            //         this.hocKy = res;
            //         console.log(this.hocKy);
            //         this.getDeTaiDaDuyet(this.hocKy.maHocKy, this.hocKy.soHocKy);
            //     }
            // });
            this.hocKyService.getHocKyMoiNhat().subscribe({
                next: (res) => {
                    this.hocKy = res;
                    console.log(this.hocKy);
                    this.getDeTaiDaDuyet(this.hocKy.maHocKy, this.hocKy.soHocKy);
                }
            });
        }
    }

    formNhom!: FormGroup;

    private maDeTaiHienTai: any;

    changeDeTai($event: MatSelectChange) {
        this.maDeTaiHienTai = $event.value.maDeTai
        console.log(this.maDeTaiHienTai)
    }

    data: any;
    hocKy: HocKy;

    private getDeTaiDaDuyet(maHocKy: any, soHocKy: any) {
        this.detaiService.getDeTaiRoleGV({
            maGiangVien: this.userAuthService.getUserInfo().maGiangVien,
            maHocKy: maHocKy,
            soHocKy: soHocKy,
            trangThai: 2
        }).subscribe({
            next: (res) => {
                this.dsDeTai = res;
                console.log(this.dsDeTai);
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    nhom: Nhom
    user: any;
    addNhom() {
        if (this.editData == null) {
            this.dsMaSinhVien.push(this.formNhom.get('maSoSv1').value)
            if (this.formNhom.get('maSoSv2') != null && this.formNhom.get('maSoSv2').value != "") {
                this.dsMaSinhVien.push(this.formNhom.get('maSoSv2').value)
            }

            if (this.maDeTaiHienTai == undefined) {
                this.maDeTaiHienTai = null;
            }
            console.log(this.userAuthService.getRoles()[0].roleName)
            if (this.formNhom.valid) {
                this.nhomService.dangKyNhom({
                    dsMaSinhVien: this.dsMaSinhVien,
                    maDeTai: this.maDeTaiHienTai,
                    vaiTro: this.userAuthService.getRoles()[0].roleName
                })
                    .subscribe((res) => {
                            this.formNhom.reset();
                            this.dialogRef.close('save');
                            new NotificationsComponent().showNotification('success', 'Thêm nhóm thành công');
                            this.user = this.userAuthService.getUserInfo();
                            this.user.nhom = res;
                            this.userAuthService.setUserInfo(this.user);
                            this.router.navigate(["/trangchuSV"])

                        },
                        (err: HttpErrorResponse) => {
                            console.log(JSON.stringify(err));
                            new NotificationsComponent().showNotification('danger', err);
                    })
            }
        }
    }
}

