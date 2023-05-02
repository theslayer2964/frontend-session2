import {Routes} from "@angular/router";
import {QlHockyComponent} from "./ql-hocky/ql-hocky.component";
import {QlKltnComponent} from "./ql-kltn/ql-kltn.component";
import {QlGiangvienComponent} from "./ql-giangvien/ql-giangvien.component";
import {AuthGuard} from "../authentication/_auth/auth.guard";
import {QlLichComponent} from "./ql-lich/ql-lich.component";
import {QlTkbChianhomComponent} from "./ql-tkb-chianhom/ql-tkb-chianhom.component";

export const QuanlyLichRouting: Routes = [
    {path: 'hocky', component: QlHockyComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
    {path: 'monhoc', component: QlKltnComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
    {path: 'giangday', component: QlGiangvienComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
    {path: 'lichbieu',component: QlLichComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
    {path: 'xepnhom',component: QlTkbChianhomComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}}
]