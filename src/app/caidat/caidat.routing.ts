import {Routes} from "@angular/router";
import {AuthGuard} from "../authentication/_auth/auth.guard";
import {NotfoundComponent} from "../shared-component/notfound/notfound.component";
import {HethongComponent} from "./hethong/hethong.component";

export const CaiDatRoutes: Routes = [
    { path: 'hethong', component: HethongComponent,canActivate: [AuthGuard],
        data: {roles: ['ROLE_QUANLY']} },
    {path:'riengtu',component: NotfoundComponent},
    {path:'nangcao',component: NotfoundComponent}
]