import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DetaiService} from "../../../giangvien/detai/detai-service/detai.service";
import {HockyService} from "../../../shared-service/hocky.service";
import {UserAuthService} from "../../../authentication/_service/user-auth.service";
import {HocKy} from "../../../shared-service/HocKy.models";
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";
import {QlThemgvpbComponent} from "../../../dialog/ql-themgvpb/ql-themgvpb.component";
import {NhomService} from "../../../shared-service/nhom.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-ql-pc-gvpb',
    templateUrl: './ql-pc-gvpb.component.html',
    styleUrls: ['./ql-pc-gvpb.component.scss']
})
export class QlPcGvpbComponent implements OnInit {
    private hocKyHienTai: any;
    private soHocKy: any;

    constructor(public dialog: MatDialog, private detaiService: DetaiService, private hockyService: HockyService,
                private userAuthService: UserAuthService, private nhomService: NhomService) {
    }

    ngOnInit(): void {
        this.getAllHocKy();
    }

    dsHocKy: HocKy[];

    // 1. STEP 1
    private getAllHocKy() {
        this.hockyService.getHocKy().subscribe({
            next: (res) => {
                this.dsHocKy = res;
            }, error: (err) => {
                console.log(err)
            }
        })
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    changeHocKy($event: MatSelectChange) {
        this.hocKyHienTai = $event.value.toString().slice(0, 3);
        this.soHocKy = $event.value.toString().slice(2);
        console.log('XXX:', this.hocKyHienTai, this.soHocKy);
        this.nhomService.getDSNhomDePhanCongGVPhanBien({maHocKy: this.hocKyHienTai, soHocKy: this.soHocKy})
            .subscribe(res => {
                this.dataSource = new MatTableDataSource(this.mappingData(res));
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    mappingData(res: any) {
        var temp;
        var tempGV;
        res.forEach(data => {
            temp = data.dsMaSinhVien;
            delete data['dsMaSinhVien']
            data.maSV1 = Object.keys(temp)[0];
            data.tenSV1 = Object.values(temp)[0];
            if (Object.keys(temp).length == 2) {
                data.maSV2 = Object.keys(temp)[1]
                data.tenSV2 = Object.values(temp)[1]
            }
            data.GVPB1 = data.dsTenGiangVienPB[0];
            data.GVPB2 = data.dsTenGiangVienPB[1];
            delete data['dsTenGiangVienPB']
        })
        return res;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    // Table
    displayedColumns: string[] = ["maNhom", "tenNhom", "maDeTai", "tenDeTai", "maSV1", "tenSV1", "maSV2", "tenSV2", "tenGiangVienHD","maGiangVienHD", "GVPB1", "GVPB2", "action"];
    dataSource!: MatTableDataSource<any>;

    editProduct(row) {
        this.dialog.open(QlThemgvpbComponent, {
            data: row
        }).afterClosed().subscribe(val => {
            // if (val === "Cập nhật") {
                this.nhomService.getDSNhomDePhanCongGVPhanBien({maHocKy: this.hocKyHienTai, soHocKy: this.soHocKy})
            // }
        })
    }

    deleteProduct(maDeTai: any) {

    }

    /// EDIT TABLE
    // usersArray = [
    //     {
    //         "id": 1,
    //         "name": "Leanne Graham",
    //         "username": "Bret",
    //         "email": "Sincere@april.biz",
    //         "phone": "1-770-736-8031 x56442",
    //         "website": "hildegard.org",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 2,
    //         "name": "Ervin Howell",
    //         "username": "Antonette",
    //         "email": "Shanna@melissa.tv",
    //         "phone": "010-692-6593 x09125",
    //         "website": "anastasia.net",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 3,
    //         "name": "Clementine Bauch",
    //         "username": "Samantha",
    //         "email": "Nathan@yesenia.net",
    //         "phone": "1-463-123-4447",
    //         "website": "ramiro.info",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 4,
    //         "name": "Patricia Lebsack",
    //         "username": "Karianne",
    //         "email": "Julianne.OConner@kory.org",
    //         "phone": "493-170-9623 x156",
    //         "website": "kale.biz",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 5,
    //         "name": "Chelsey Dietrich",
    //         "username": "Kamren",
    //         "email": "Lucio_Hettinger@annie.ca",
    //         "phone": "(254)954-1289",
    //         "website": "demarco.info",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 6,
    //         "name": "Mrs. Dennis Schulist",
    //         "username": "Leopoldo_Corkery",
    //         "email": "Karley_Dach@jasper.info",
    //         "phone": "1-477-935-8478 x6430",
    //         "website": "ola.org",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 7,
    //         "name": "Kurtis Weissnat",
    //         "username": "Elwyn.Skiles",
    //         "email": "Telly.Hoeger@billy.biz",
    //         "phone": "210.067.6132",
    //         "website": "elvis.io",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 8,
    //         "name": "Nicholas Runolfsdottir V",
    //         "username": "Maxime_Nienow",
    //         "email": "Sherwood@rosamond.me",
    //         "phone": "586.493.6943 x140",
    //         "website": "jacynthe.com",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 9,
    //         "name": "Glenna Reichert",
    //         "username": "Delphine",
    //         "email": "Chaim_McDermott@dana.io",
    //         "phone": "(775)976-6794 x41206",
    //         "website": "conrad.com",
    //         "isEdit": false
    //     },
    //     {
    //         "id": 10,
    //         "name": "Clementina DuBuque",
    //         "username": "Moriah.Stanton",
    //         "email": "Rey.Padberg@karina.biz",
    //         "phone": "024-648-3804",
    //         "website": "ambrose.net",
    //         "isEdit": false
    //     }
    // ]
    // temp: any;
    // onEdit(item: any) {
    //     debugger;
    //     this.usersArray.forEach(element => {
    //         element.isEdit = false;
    //         this.temp = element;
    //     });
    //     item.isEdit = true;
    // }
    //
    // onCancel(user: any) {
    //     console.log("TEMP:",this.temp);
    //     user.isEdit = false
    //     this.usersArray.forEach(element => {
    //         if(element.id == user.id){
    //             console.log("array:", element)
    //             console.log("data edit:", user);
    //         }
    //     });
    //     // console.log(this.usersArray);
    // }
    //
    // onUpdate(user: any){
    //     console.log("onupdate:", user);
    // }
}
