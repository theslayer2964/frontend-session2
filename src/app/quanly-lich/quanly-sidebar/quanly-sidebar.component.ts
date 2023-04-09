import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material/tree";

declare interface RouteInfo {
  path: string,
  title: string,
  icon: string,
  class: string
}
export const ROUTES: RouteInfo[] = [
  {path:'/quanlylich/hocky', title: 'Học kỳ', icon: 'dashboard', class:''},
  {path:'/quanlylich/monhoc', title: 'Khóa luận tốt nghiệp', icon: 'dashboard', class:''},
  {path:'/quanlylich/giangday', title: 'Giảng viên', icon: 'dashboard', class:''},
  {path:'/quanlylich/lichbieu', title: 'Lịch biểu', icon: 'dashboard', class:''},
]

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Lịch biểu',
    children: [{name: 'Lịch học'}, {name: 'Giảng viên'}, {name: 'Sinh viên'}],
  }
];


@Component({
  selector: 'app-quanly-sidebar',
  templateUrl: './quanly-sidebar.component.html',
  styleUrls: ['./quanly-sidebar.component.scss']
})
export class QuanlySidebarComponent implements OnInit {
  menuItems: any[];

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
