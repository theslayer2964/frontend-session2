import {Component, OnInit, ViewChild} from '@angular/core';
import {HockyService} from "../../shared-service/hocky.service";
import {LichService} from "../../shared-service/lich/lich.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-ql-lich',
    templateUrl: './ql-lich.component.html',
    styleUrls: ['./ql-lich.component.scss']
})
export class QlLichComponent implements OnInit {

    dsHocKy: HocKy[];
    dsKeHoachGV: any;
    dsKeHoachSV: any;

    constructor(private hocKyService: HockyService, private lichServer: LichService,
                private formBuilder: FormBuilder, private lichService: LichService) {

    }

    ngOnInit(): void {
        this.getAllHocKy();
        this.keHoachGroup = this.formBuilder.group({
            id: [],
            tenKeHoach: [],
            chuThich: [],
            thoiGianBatDau: [],
            thoiGianKetThuc: [],
            // dsNgayThucHienKhoaLuan: [[]], // KO CAN
            vaiTro: [],
            // tinhTrang:[], // KO CAN
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

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)

        this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_GIANGVIEN").subscribe({
                next: (res) => {
                    this.dsKeHoachGV = res
                }
            }
        )
        this.lichServer.getLichTheoHocKyVaMaGV(this.hocKyHienTai, null, "ROLE_SINHVIEN").subscribe({
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
            hocKy: this.keHoach.hocKy,
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
        }
        if(this.keHoach.vaiTro == "ROLE_GIANGVIEN"){
            this.lichService.updateLich(keHoachRequest).subscribe(res => {
                this.dsKeHoachSV.filter(data => {
                    if(data.id == res.id){
                        data = res;
                    }
                })
            });
        }
    }
    pipe = new DatePipe('en-US');
}
