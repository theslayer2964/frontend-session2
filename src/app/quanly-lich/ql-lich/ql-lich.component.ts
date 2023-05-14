import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HockyService} from "../../shared-service/hocky.service";
import {LichService} from "../../shared-service/lich/lich.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {NotificationsComponent} from "../../shared-component/notifications/notifications.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from "@angular/material-moment-adapter";

@Component({
    selector: 'app-ql-lich',
    templateUrl: './ql-lich.component.html',
    styleUrls: ['./ql-lich.component.scss'],
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class QlLichComponent implements OnInit {

    dsHocKy: HocKy[];
    dsKeHoachGV: any;
    dsKeHoachSV: any;

    constructor(private hocKyService: HockyService,
                private formBuilder: FormBuilder, private lichService: LichService,
                private _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) private _locale: string,) {
        this._locale = 'fr';
        this._adapter.setLocale(this._locale);
    }

    ngOnInit(): void {
        this.getAllHocKy();
        this.keHoachGroup = this.formBuilder.group({
            id: [],
            tenKeHoach: [],
            chuThich: [],
            thoiGianBatDau: [],
            thoiGianKetThuc: [],
            vaiTro: [],
            hocKy: [],
            maNguoiDung: []
        })

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
    private maHK: string;

    changeHocKy($event: MatSelectChange) {
        this.display = false;
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)
        this.maHK = $event.value;
        this.lichService.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_GIANGVIEN").subscribe({
                next: (res) => {
                    this.dsKeHoachGV = res
                }
            }
        )
        this.lichService.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_SINHVIEN").subscribe({
                next: (res) => {
                    this.dsKeHoachSV = res
                }
            }
        )
    }

    keHoach: any;
    display: boolean = false;
    keHoachGroup!: FormGroup;

    chinhSuaData(keHoach: any) {
        this.keHoach = keHoach
        console.log("QL LICH:",new Date(this.keHoach.thoiGianBatDau).getDate()+"-"+new Date(this.keHoach.thoiGianBatDau).getMonth()+"-"+
            new Date(this.keHoach.thoiGianBatDau).getFullYear());
        console.log("QL LICH:",new Date(this.keHoach.thoiGianBatDau));
        this.display = true;
        if (this.keHoach) {
            this.keHoachGroup.controls['id'].setValue(this.keHoach.id);
            this.keHoachGroup.controls['tenKeHoach'].setValue(this.keHoach.tenKeHoach);
            this.keHoachGroup.controls['chuThich'].setValue(this.keHoach.chuThich);
            // this.keHoachGroup.controls['hocKy'].setValue(this.keHoach.hocKy);
            this.keHoachGroup.controls['thoiGianBatDau'].setValue(this.pipe.transform(this.keHoach.thoiGianBatDau, 'yyyy-MM-dd'));
            this.keHoachGroup.controls['thoiGianKetThuc'].setValue(this.pipe.transform(this.keHoach.thoiGianKetThuc, 'yyyy-MM-dd'));
            // this.keHoachGroup.controls['tinhTrang'].setValue(this.keHoach.tinhTrang);
            this.keHoachGroup.controls['vaiTro'].setValue(this.keHoach.vaiTro);
            this.keHoachGroup.controls['maNguoiDung'].setValue(this.keHoach.maNguoiDung);
        }
    }

    onUpdateKeHoach() {
        const keHoachRequest = {
            id: this.keHoachGroup.value.id,
            tenKeHoach: this.keHoachGroup.value.tenKeHoach,
            chuThich: this.keHoachGroup.value.chuThich,
            thoiGianBatDau: this.keHoachGroup.value.thoiGianBatDau,
            thoiGianKetThuc: this.keHoachGroup.value.thoiGianKetThuc,
            maHocKy: this.keHoach.hocKy.maHocKy,
            maNguoiDung: null,
            tinhTrang: 0,
            vaiTro: "ROLE_QUANLY",
        }
        if(this.keHoach.vaiTro == "ROLE_SINHVIEN"){
            this.lichService.updateLich(keHoachRequest).subscribe(res => {
                this.dsKeHoachSV.filter(data => {
                    if(data.id == res.id){
                        data = res;
                    }
                })
            });
            new NotificationsComponent().showNotification("success","Cập nhật kế hoạch cho sinh viên thành công");

        }
        if(this.keHoach.vaiTro == "ROLE_GIANGVIEN"){
            this.lichService.updateLich(keHoachRequest).subscribe(res => {
                this.dsKeHoachSV.filter(data => {
                    if(data.id == res.id){
                        data = res;
                    }
                })
            });
            new NotificationsComponent().showNotification("success","Cập nhật kế hoạch cho giảng viên thành công");

        }
    }
    pipe = new DatePipe('en-US');
}
