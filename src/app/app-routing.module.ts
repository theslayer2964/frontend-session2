import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./shared-component/home/home.component";
import {ForbiddenComponent} from "./authentication/forbidden/forbidden.component";
import {LoginComponent} from "./authentication/login/login.component";
import {AuthGuard} from "./authentication/_auth/auth.guard";
import {SinhvienContainerComponent} from "./sinhvien/sinhvien-container/sinhvien-container.component";
import {SinhvienChonnhomComponent} from "./sinhvien/nhom/sinhvien-chonnhom/sinhvien-chonnhom.component";
import {GiangvienContainerComponent} from "./giangvien/giangvien-container/giangvien-container.component";
import {SinhvienDetaiComponent} from "./sinhvien/sinhvien-detai/sinhvien-detai.component";
import {NotfoundComponent} from "./shared-component/notfound/notfound.component";
import {QuanlyContainerComponent} from "./quanly/quanly-container/quanly-container.component";
import {QuanlyNhomComponent} from "./quanly/quanly-nhom/quanly-nhom.component";
import {QuanlyDetaiComponent} from "./quanly/quanly-detai/quanly-detai.component";
import {CaidatContainerComponent} from "./caidat/caidat-container/caidat-container.component";
import {QuanlyLich2Component} from "./quanly-lich/quanly-lich2/quanly-lich2.component";
import {QuanlyLichContainerComponent} from "./quanly-lich/quanly-lich-container/quanly-lich-container.component";
import {QuanlySinhvienComponent} from "./quanly/quanly-sinhvien/quanly-sinhvien.component";
import {QuanlyGiangvienComponent} from "./quanly/quanly-giangvien/quanly-giangvien.component";
import {SinhvienDiemComponent} from "./sinhvien/sinhvien-diem/sinhvien-diem.component";
import {SinhvienLichComponent} from "./sinhvien/sinhvien-lich/sinhvien-lich.component";
import {QuanlyTieuchichamComponent} from "./quanly/quanly-tieuchicham/quanly-tieuchicham.component";
import {QuanlyPhieuchamComponent} from "./quanly/quanly-phieucham/quanly-phieucham.component";
import {QlPcContainerComponent} from "./quanly/quanly-phancong/ql-pc-container/ql-pc-container.component";
import {QuanlyLophocphanComponent} from "./quanly/quanly-lophocphan/quanly-lophocphan.component";
import {QuanlyKetquahoctapComponent} from "./quanly/quanly-ketquahoctap/quanly-ketquahoctap.component";

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
        path: 'quanly/nhom',
        component: QuanlyNhomComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/detai',
        component: QuanlyDetaiComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/sinhvien',
        component: QuanlySinhvienComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/giangvien',
        component: QuanlyGiangvienComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/lich',
        component: QuanlyLich2Component,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/sinhvien',
        component: QuanlySinhvienComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/giangvien',
        component: QuanlyGiangvienComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/tieuchicham',
        component: QuanlyTieuchichamComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/phieucham',
        component: QuanlyPhieuchamComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/lophocphan',
        component: QuanlyLophocphanComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/ketqua-hoctap',
        component: QuanlyKetquahoctapComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly/:id',
        component: QuanlyContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanly',
        component: QuanlyContainerComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']}
    },
    {
        path: 'quanlylich', component: QuanlyLichContainerComponent,
        children: [
            {
            path: '',
            loadChildren: () => import('./quanly-lich/quanly-lich.module').then(m => m.QuanlyLichModule)
        }]
    },
    {
        path: 'quanlypc', component: QlPcContainerComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./quanly/quanly-phancong/quanly-pc-gv.module').then(m => m.QuanlyPcGvModule)
            }]
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
    {
        path: 'sv-diem',
        component: SinhvienDiemComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN']}
    },
    {
        path: 'sv-lich',
        component: SinhvienLichComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_SINHVIEN','ROLE_GIANGVIEN']}
    },
    {
        path: 'caidat', component: CaidatContainerComponent,
        children: [{
            path: '',
            loadChildren: () => import('./caidat/caidat.module').then(m => m.CatDatModule)
        }]
    },
    {path: 'login', component: LoginComponent},
    {path: 'forbidden', component: ForbiddenComponent},
    {path: '**', component: NotfoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}