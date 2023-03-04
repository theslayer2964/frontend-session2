import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {HocKy} from "../../shared-service/HocKy.models";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-giangvien-nhom',
    templateUrl: './giangvien-nhom.component.html',
    styleUrls: ['./giangvien-nhom.component.scss']
})
export class GiangvienNhomComponent implements OnInit {
    displayedColumns2: string[] = ['maNhom', 'maDeTai', "sv1", "sv2", 'danhGia', "action"];
    dataSource!: MatTableDataSource<any>;
    dsHocKy: HocKy[];

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService) {
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

    }

    editProduct(row) {

    }

    deleteProduct(id) {

    }

    private hocKyHienTai: any;

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value
        console.log($event.value)
        // this.getDSDeTaiTheoHK($event.value);
    }

    private getDSDeTaiTheoHK(hocKy: any) {
        this.detaiService.getDeTaiRoleGV(hocKy)
            .subscribe({
                next: (res) => {
                    console.log("DS DE TAI:", res);
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: () => {
                    console.log("Error")
                }
            })
    }
}
