import {Component, OnInit, ViewChild} from '@angular/core';
import {HockyService} from "../../shared-service/hocky.service";
import {LichService} from "../../shared-service/lich/lich.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-ql-lich',
    templateUrl: './ql-lich.component.html',
    styleUrls: ['./ql-lich.component.scss']
})
export class QlLichComponent implements OnInit {

    dsHocKy: HocKy[];
    dsKeHoachGV: any;
    dsKeHoachSV: any;

    constructor(private hocKyService: HockyService, private lichServer: LichService, private formBuilder: FormBuilder,) {

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
            hocKy:[],
            maNguoiDung:[]
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
    display:boolean = false;
    keHoachGroup!: FormGroup;
    chinhSuaData(keHoach: any) {
        this.keHoach = keHoach
        this.display = true;
        if(this.keHoach){
            // this.keHoachGroup.controls['id'].setValue(this.keHoach.id);
            // this.keHoachGroup.controls['tenKeHoach'].setValue(this.keHoach.tenKeHoach);
            this.keHoachGroup.controls['chuThich'].setValue(this.keHoach.chuThich);
            // this.keHoachGroup.controls['hocKy'].setValue(this.keHoach.hocKy);
            this.keHoachGroup.controls['thoiGianBatDau'].setValue(this.keHoach.thoiGianBatDau);
            this.keHoachGroup.controls['thoiGianKetThuc'].setValue(this.keHoach.thoiGianKetThuc);
            // this.keHoachGroup.controls['tinhTrang'].setValue(this.keHoach.tinhTrang);
            // this.keHoachGroup.controls['vaiTro'].setValue(this.keHoach.vaiTro);
            // this.keHoachGroup.controls['maNguoiDung'].setValue(this.keHoach.maNguoiDung);
        }
    }

    onUpdateKeHoach(keHoach: any) {
        console.log("KE HOACH:", JSON.stringify(keHoach));
    }
}
