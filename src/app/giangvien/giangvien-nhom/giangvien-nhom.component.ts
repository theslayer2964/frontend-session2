    import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ThemNhomComponent} from "../../dialog/them-nhom/them-nhom.component";
import {UserAuthService} from "../../authentication/_service/user-auth.service";
import {NhomService} from "../../shared-service/nhom.service";
import {ThemDeTaiGvComponent} from "../../dialog/them-de-tai-gv/them-de-tai-gv.component";

@Component({
    selector: 'app-giangvien-nhom',
    templateUrl: './giangvien-nhom.component.html',
    styleUrls: ['./giangvien-nhom.component.css']
})
export class GiangvienNhomComponent implements OnInit {
    displayedColumns: string[] = ['maNhom', 'maDeTai', 'sv1', 'sv2', "danhGia","action"];
    dataSource!: MatTableDataSource<any>;
    dsHocKy: HocKy[];

    constructor(public dialog: MatDialog, private nhomService: NhomService, private hockyService: HockyService,
                private userAuthService: UserAuthService) {

    }

    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                this.dsHocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    ngOnInit(): void {
        this.getAllHocKy();
        console.log("PAREN TO CHILD:", this.validateNhom);
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    impType: any;
    selected: any;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    openDialog() {
        this.dialog.open(ThemNhomComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {

            }
        })
    }

    editProduct(row: any) {
        this.dialog.open(ThemNhomComponent, {
            data: row
        }).afterClosed().subscribe(val => {
            if (val === "update") {
                // this.getDSDeTaiTheoHK(this.hocKyHienTai, this.soHocKy);
            }
        })
    }

    deleteProduct(id) {

    }
    private hocKyHienTai: any;
    private soHocKy: any;

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3)
        this.soHocKy = $event.value.toString().slice(2)
        console.log('XXX:', this.hocKyHienTai, this.soHocKy);
        this.getDsNhom(this.hocKyHienTai, this.soHocKy);
    }

    private getDsNhom(maHocKy: any, soHocKy: any) {
        this.nhomService.getNhomRoleGV({
            maGiangVien: this.userAuthService.getUserInfo().maGiangVien,
            maHocKy: maHocKy,
            soHocKy: soHocKy
        })
            .subscribe({
                next: (res) => {
                    if (res) {
                        console.log("GV _ Nhom:", res);
                        this.dataSource = new MatTableDataSource(res);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                },
                error: () => {
                    console.log("Error")
                }
            })
    }

    // Table
    @Input() validateNhom:any;

}
