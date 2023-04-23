import {Routes} from "@angular/router";
import {AuthGuard} from "../../authentication/_auth/auth.guard";
import {QlPcGvpbComponent} from "./ql-pc-gvpb/ql-pc-gvpb.component";
import {QlPcGvhdComponent} from "./ql-pc-gvhd/ql-pc-gvhd.component";

export  const QuanlyPcGvRouting: Routes = [
    {path: 'pcgvpb', component: QlPcGvpbComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
    {path: 'pcgvhd', component: QlPcGvhdComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}},
]