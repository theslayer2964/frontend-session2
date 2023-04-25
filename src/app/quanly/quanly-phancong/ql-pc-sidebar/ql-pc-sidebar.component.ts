import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string,
  title: string,
  icon: string,
  class: string
}
export const ROUTES: RouteInfo[] = [
  {path:'/quanlypc/pcgvpb', title: 'Giảng viên phản biện', icon: 'dashboard', class:''},
  {path:'/quanlypc/pcgvhd', title: 'Thành viên hội đồng', icon: 'dashboard', class:''},
]

@Component({
  selector: 'app-ql-pc-sidebar',
  templateUrl: './ql-pc-sidebar.component.html',
  styleUrls: ['./ql-pc-sidebar.component.scss']
})
export class QlPcSidebarComponent implements OnInit {
  menuItems: any;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
