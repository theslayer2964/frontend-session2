import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../../authentication/_auth/auth.guard";

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/caidat/hethong', title: 'Hệ thống', icon: 'dashboard', class: ''},
    {path: '/caidat/riengtu', title: 'Thông tin cá nhân', icon: 'person', class: ''},
    {path: '/caidat/nangcao', title: 'Cài đặt nâng cao', icon: 'content_paste', class: ''}
];

@Component({
    selector: 'app-caidat-sidebar',
    templateUrl: './caidat-sidebar.component.html',
    styleUrls: ['./caidat-sidebar.component.scss']
})
export class CaidatSidebarComponent implements OnInit {
    menuItems: any[];
    constructor() {

    }
    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
