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
import { QuanlyLich2Component } from './quanly/quanly-lich2/quanly-lich2.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { NotificationsComponent } from './shared-component/notifications/notifications.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { QuanlyNhomComponent } from './quanly/quanly-nhom/quanly-nhom.component';
import { QuanlyDetaiComponent } from './quanly/quanly-detai/quanly-detai.component';
import { CaidatContainerComponent } from './caidat/caidat-container/caidat-container.component';
import { CaidatSidebarComponent } from './caidat/caidat-sidebar/caidat-sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ThemNhomComponent} from "./dialog/them-nhom/them-nhom.component";
import { DangkyCosanComponent } from './dialog/dangky-cosan/dangky-cosan.component';

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
        FullCalendarModule
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
        QuanlyLich2Component,
        NotificationsComponent,
        QuanlyNhomComponent,
        QuanlyDetaiComponent,
        CaidatContainerComponent,
        CaidatSidebarComponent,
        ThemNhomComponent,
        DangkyCosanComponent
    ],
    providers: [AuthGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
        UserService,
        UserDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
