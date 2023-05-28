import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {DetaiComponent} from "./giangvien/detai/detai-container/detai.component";
import {AdminComponent} from "./authentication/admin/admin.component";
import {SharedComponent} from "./shared-component/navigate-header/shared.component";
import {HomeComponent} from "./shared-component/home/home.component";
import {ForbiddenComponent} from "./authentication/forbidden/forbidden.component";
import {ThemDeTaiGvComponent} from "./dialog/them-de-tai-gv/them-de-tai-gv.component";
import {SinhvienContainerComponent} from "./sinhvien/sinhvien-container/sinhvien-container.component";
import {LoginComponent} from "./authentication/login/login.component";
import {TabNavComponent} from "./giangvien/tab-nav/tab-nav.component";
import {UserComponent} from "./authentication/user/user.component";
import {FooterComponent} from "./shared-component/footer/footer.component";
import {AppRoutingModule} from "./app-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {AvatarModule} from "ngx-avatar";
import {BrowserModule} from "@angular/platform-browser";
import {UserService} from "./authentication/_service/user.service";
import {AuthInterceptor} from "./authentication/_auth/auth.interceptor";
import {AuthGuard} from "./authentication/_auth/auth.guard";
import {GiangvienContainerComponent} from './giangvien/giangvien-container/giangvien-container.component';
import {SinhvienDetaiComponent} from './sinhvien/sinhvien-detai/sinhvien-detai.component';
import {SinhvienChonnhomComponent} from "./sinhvien/nhom/sinhvien-chonnhom/sinhvien-chonnhom.component";
import {NotfoundComponent} from './shared-component/notfound/notfound.component';
import {GiangvienNhomComponent} from './giangvien/giangvien-nhom/giangvien-nhom.component';
import {QuanlyContainerComponent} from './quanly/quanly-container/quanly-container.component';
import {ThemLichQlComponent} from './dialog/them-lich-ql/them-lich-ql.component';
import {ProfileComponent} from './shared-component/profile/profile.component';
import {UserDataService} from "./shared-service/userData.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import { NotificationsComponent } from './shared-component/notifications/notifications.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { QuanlyNhomComponent } from './quanly/quanly-nhom/quanly-nhom.component';
import { QuanlyDetaiComponent } from './quanly/quanly-detai/quanly-detai.component';
import { CaidatContainerComponent } from './caidat/caidat-container/caidat-container.component';
import { CaidatSidebarComponent } from './caidat/caidat-sidebar/caidat-sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { ThemLichComponent } from './dialog/them-lich/them-lich.component';
import {QuanlyLichModule} from "./quanly-lich/quanly-lich.module";
import {CatDatModule} from "./caidat/caidat.module";

import {ThemNhomComponent} from "./dialog/them-nhom/them-nhom.component";
import { DangkyCosanComponent } from './dialog/dangky-cosan/dangky-cosan.component';
import { DangKyDetaiComponent } from './dialog/dang-ky-detai/dang-ky-detai.component';
import { ChangepasswordComponent } from './authentication/changepassword/changepassword.component';
import {ThemNhomTransferService} from "./transfer-data-service/them-nhom-transfer.service";
import { QuanlyGiangvienComponent } from './quanly/quanly-giangvien/quanly-giangvien.component';
import { QuanlySinhvienComponent } from './quanly/quanly-sinhvien/quanly-sinhvien.component';
import { DialogDeTaiGVComponent } from './excel/dialog-de-tai-gv/dialog-de-tai-gv.component';
import { DialogExcelQlSinhvienComponent } from './excel/dialog-excel-ql-sinhvien/dialog-excel-ql-sinhvien.component';
import { DialogExcelQlGiangvienComponent } from './excel/dialog-excel-ql-giangvien/dialog-excel-ql-giangvien.component';
import { SinhvienDiemComponent } from './sinhvien/sinhvien-diem/sinhvien-diem.component';
import { SinhvienLichComponent } from './sinhvien/sinhvien-lich/sinhvien-lich.component';
import { GiangvienChamdiemComponent } from './giangvien/giangvien-chamdiem/giangvien-chamdiem.component';
import { ThemSvComponent } from './dialog/them-sv/them-sv.component';
import { ThemgvComponent } from './dialog/themgv/themgv.component';
import { QuanlyTieuchichamComponent } from './quanly/quanly-tieuchicham/quanly-tieuchicham.component';
import { QuanlyPhieuchamComponent } from './quanly/quanly-phieucham/quanly-phieucham.component';
import {MatListModule} from "@angular/material/list";
import {QuanlyPcGvModule} from "./quanly/quanly-phancong/quanly-pc-gv.module";
import { QlThemgvpbComponent } from './dialog/ql-themgvpb/ql-themgvpb.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ThemHockyComponent } from './dialog/them-hocky/them-hocky.component';
import { ThemTieuChiChamdiemComponent } from './dialog/them-tieu-chi-chamdiem/them-tieu-chi-chamdiem.component';
import { ThemPhieuChamMauComponent } from './dialog/them-phieu-cham-mau/them-phieu-cham-mau.component';
import { DuyetdetaiComponent } from './dialog/duyetdetai/duyetdetai.component';
import { LoiNhanComponent } from './dialog/loi-nhan/loi-nhan.component';
import { ThongbaoComponent } from './dialog/thongbao/thongbao.component';
import { GiangvienPhancongComponent } from './giangvien/giangvien-phancong/giangvien-phancong.component';
import { GvChamdiemComponent } from './dialog/gv-chamdiem/gv-chamdiem.component';
import { QlXepTKBComponent } from './dialog/ql-xep-tkb/ql-xep-tkb.component';
import { QlXepTKBHDComponent } from './dialog/ql-xep-tkb-hd/ql-xep-tkb-hd.component';
import { GiangvienLichComponent } from './giangvien/giangvien-lich/giangvien-lich.component';
import { GvShowCallendarComponent } from './dialog/gv-show-callendar/gv-show-callendar.component';
import { QuanlyLophocphanComponent } from './quanly/quanly-lophocphan/quanly-lophocphan.component';
import { QuanlyKetquahoctapComponent } from './quanly/quanly-ketquahoctap/quanly-ketquahoctap.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatMenuModule} from "@angular/material/menu";
import { ThemLopHocPhanComponent } from './dialog/them-lop-hoc-phan/them-lop-hoc-phan.component';
import { DialogExportExcelComponent } from './excel/dialog-export-excel/dialog-export-excel.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { QlDiemBaoComponent } from './dialog/ql-diem-bao/ql-diem-bao.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { DialogExcelTieuChiChamDiemComponent } from './excel/dialog-excel-tieu-chi-cham-diem/dialog-excel-tieu-chi-cham-diem.component';
import { QuanlyTientrinhComponent } from './quanly/quanly-tientrinh/quanly-tientrinh.component';
import { QuanlyTientrinhChungComponent } from './quanly/quanly-tientrinh-chung/quanly-tientrinh-chung.component';
import { QuanlyTientrinhDetaiComponent } from './quanly/quanly-tientrinh-detai/quanly-tientrinh-detai.component';
import { QuanlyTientrinhSinhvienComponent } from './quanly/quanly-tientrinh-sinhvien/quanly-tientrinh-sinhvien.component';
import { DsGVChuaDuDeTaiComponent } from './dialog/ds-gvchua-du-de-tai/ds-gvchua-du-de-tai.component';
import { DSSVChuaDkNhomComponent } from './dialog/dssvchua-dk-nhom/dssvchua-dk-nhom.component';
import { DSNhomChuaDkDeTaiComponent } from './dialog/dsnhom-chua-dk-de-tai/dsnhom-chua-dk-de-tai.component';
import { SvXinDangKyDeTaiComponent } from './dialog/sv-xin-dang-ky-de-tai/sv-xin-dang-ky-de-tai.component';
import { QuanlyTientrinhDetaiGanComponent } from './quanly/quanly-tientrinh-detai-gan/quanly-tientrinh-detai-gan.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        AvatarModule,
        BrowserModule,
        MatTabsModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatBadgeModule,
        MatTooltipModule,
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatChipsModule,
        RouterModule,
        MatDividerModule,
        QuanlyLichModule,
        QuanlyPcGvModule,
        CatDatModule,
        FullCalendarModule,
        MatListModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatMenuModule,
        MatCheckboxModule,
        MatBottomSheetModule,
        MatSlideToggleModule
    ],
    declarations: [
        AppComponent,
        AppComponent,
        SharedComponent,
        TabNavComponent,
        DetaiComponent,
        ThemDeTaiGvComponent,
        SinhvienContainerComponent,
        HomeComponent,
        AdminComponent,
        UserComponent,
        ForbiddenComponent,
        LoginComponent,
        FooterComponent,
        SinhvienChonnhomComponent,
        GiangvienContainerComponent,
        SinhvienDetaiComponent,
        NotfoundComponent,
        GiangvienNhomComponent,
        QuanlyContainerComponent,
        ThemLichQlComponent,
        ProfileComponent,
        NotificationsComponent,
        QuanlyNhomComponent,
        QuanlyDetaiComponent,
        CaidatContainerComponent,
        CaidatSidebarComponent,
        ThemLichComponent,
        CaidatSidebarComponent,
        ThemNhomComponent,
        DangkyCosanComponent,
        DangKyDetaiComponent,
        ChangepasswordComponent,
        QuanlyGiangvienComponent,
        QuanlySinhvienComponent,
        DialogDeTaiGVComponent,
        DialogExcelQlSinhvienComponent,
        DialogExcelQlGiangvienComponent,
        SinhvienDiemComponent,
        SinhvienLichComponent,
        GiangvienChamdiemComponent,
        ThemSvComponent,
        ThemgvComponent,
        QuanlyTieuchichamComponent,
        QuanlyPhieuchamComponent,
        QlThemgvpbComponent,
        QuanlyPhieuchamComponent,
        ThemHockyComponent,
        ThemTieuChiChamdiemComponent,
        ThemPhieuChamMauComponent,
        DuyetdetaiComponent,
        LoiNhanComponent,
        ThongbaoComponent,
        GiangvienPhancongComponent,
        GvChamdiemComponent,
        QlXepTKBComponent,
        QlXepTKBHDComponent,
        GiangvienLichComponent,
        GvShowCallendarComponent,
        QuanlyLophocphanComponent,
        QuanlyKetquahoctapComponent,
        ThemLopHocPhanComponent,
        DialogExportExcelComponent,
        QlDiemBaoComponent,
        DialogExcelTieuChiChamDiemComponent,
        QuanlyTientrinhComponent,
        QuanlyTientrinhChungComponent,
        QuanlyTientrinhDetaiComponent,
        QuanlyTientrinhSinhvienComponent,
        DsGVChuaDuDeTaiComponent,
        DSSVChuaDkNhomComponent,
        DSNhomChuaDkDeTaiComponent,
        SvXinDangKyDeTaiComponent,
        QuanlyTientrinhDetaiGanComponent
    ],
    providers: [AuthGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
        UserService,
        UserDataService,
    ThemNhomTransferService],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
