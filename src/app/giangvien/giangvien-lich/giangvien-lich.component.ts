import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-giangvien-lich',
  templateUrl: './giangvien-lich.component.html',
  styleUrls: ['./giangvien-lich.component.scss']
})
export class GiangvienLichComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
}
