import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./shared-component/home/home.component";
import {ForbiddenComponent} from "./authentication/forbidden/forbidden.component";
import {AdminComponent} from "./authentication/admin/admin.component";
import {UserComponent} from "./authentication/user/user.component";
import {LoginComponent} from "./authentication/login/login.component";
import {AuthGuard} from "./authentication/_auth/auth.guard";
import {SinhvienContainerComponent} from "./sinhvien/sinhvien-container/sinhvien-container.component";
import {SinhvienChonnhomComponent} from "./sinhvien/nhom/sinhvien-chonnhom/sinhvien-chonnhom.component";
import {GiangvienContainerComponent} from "./giangvien/giangvien-container/giangvien-container.component";
import {SinhvienDetaiComponent} from "./sinhvien/sinhvien-detai/sinhvien-detai.component";
import {NotfoundComponent} from "./shared-component/notfound/notfound.component";
import {QuanlyContainerComponent} from "./quanly/quanly-container/quanly-container.component";

const routes: Routes = [

    {path: '', component: HomeComponent},
    {
        path: 'trangchuGV',
        component: GiangvienContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_GIANGVIEN']}
    },
    {
        path: 'trangchuSV',
        component: SinhvienContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN']}
    },
    {
        path: 'trangchuQL',
        component: QuanlyContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'trangchuGV/:id',
        component: GiangvienContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_GIANGVIEN']}
    },
    {
        path: 'trangchuSV/:id',
        component: SinhvienContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN']}
    },
    {
        path: 'trangchuQL/:id',
        component: QuanlyContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'sv-chonNhom',
        component: SinhvienChonnhomComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN']}
    },
    {
        path: 'sv-chonDeTai',
        component: SinhvienDetaiComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN']}
    },
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ForbiddenComponent},
    {path:'**', component:NotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
