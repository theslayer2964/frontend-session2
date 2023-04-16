import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {QuanlyLichRouting} from "./quanly-lich.routing";
import { QuanlyLichContainerComponent } from './quanly-lich-container/quanly-lich-container.component';
import { QuanlySidebarComponent } from './quanly-sidebar/quanly-sidebar.component';
import { QlHockyComponent } from './ql-hocky/ql-hocky.component';
import { QlKltnComponent } from './ql-kltn/ql-kltn.component';
import { QlGiangvienComponent } from './ql-giangvien/ql-giangvien.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import { QlLichComponent } from './ql-lich/ql-lich.component';
import {BrowserModule} from "@angular/platform-browser";
import {QlChitietlichComponent} from "./ql-chitietlich/ql-chitietlich.component";
import {MatFormFieldModule} from "@angular/material/form-field";
// // @ts-ignore
// import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QuanlyLichRouting),
    // FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    BrowserModule,
    MatFormFieldModule,
    // NgbModule,
    // FormsModule,
    RouterModule,
  ],
  declarations: [
    QuanlyLichContainerComponent,
    QuanlySidebarComponent,
    QlHockyComponent,
    QlKltnComponent,
    QlGiangvienComponent,
    QlLichComponent,
    QlChitietlichComponent
  ],
  bootstrap: []
})
export class QuanlyLichModule { }
