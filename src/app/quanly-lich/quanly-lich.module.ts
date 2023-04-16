import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {QuanlyLichRouting} from "./quanly-lich.routing";
import {QuanlyLichContainerComponent} from './quanly-lich-container/quanly-lich-container.component';
import {QuanlySidebarComponent} from './quanly-sidebar/quanly-sidebar.component';
import {QlHockyComponent} from './ql-hocky/ql-hocky.component';
import {QlKltnComponent} from './ql-kltn/ql-kltn.component';
import {QlGiangvienComponent} from './ql-giangvien/ql-giangvien.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {QlLichComponent} from './ql-lich/ql-lich.component';
import {BrowserModule} from "@angular/platform-browser";
import {QlChitietlichComponent} from "./ql-chitietlich/ql-chitietlich.component";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {QuanlyLich2Component} from "./quanly-lich2/quanly-lich2.component";
import {FullCalendarModule} from "@fullcalendar/angular";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(QuanlyLichRouting),
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatTreeModule,
        MatIconModule,
        BrowserModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        FullCalendarModule
    ],
    declarations: [
        QuanlyLichContainerComponent,
        QuanlySidebarComponent,
        QlHockyComponent,
        QlKltnComponent,
        QlGiangvienComponent,
        QlLichComponent,
        QlChitietlichComponent,
        QuanlyLich2Component
    ],
    bootstrap: []
})
export class QuanlyLichModule {
}
