import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../shared-service/hocky.service";
import {ThemDeTaiGvComponent} from "../../dialog/them-de-tai-gv/them-de-tai-gv.component";
import {ThemHockyComponent} from "../../dialog/them-hocky/them-hocky.component";

@Component({
    selector: 'app-ql-hocky',
    templateUrl: './ql-hocky.component.html',
    styleUrls: ['./ql-hocky.component.scss']
})
export class QlHockyComponent implements OnInit {

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService) {
    }

    ngOnInit(): void {
    }

    // Table
    displayedColumns: string[] = ['maHocKy', "soHocKy", 'thoiGianBatDau', 'thoiGianKetThuc', "action"];
    dataSource!: MatTableDataSource<any>;

    openDialog() {
        console.log("action")
        this.dialog.open(ThemHockyComponent, {}).afterClosed().subscribe(val => {
            if (val === "save") {

            }
        })
    }


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editProduct(row) {

    }

    deleteProduct(maDeTai: any) {

    }
}
