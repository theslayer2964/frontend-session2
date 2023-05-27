import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as url from "url";
import * as Chartist from "chartist";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables);

@Component({
  selector: 'app-quanly-container',
  templateUrl: './quanly-container.component.html',
  styleUrls: ['./quanly-container.component.scss']
})
export class QuanlyContainerComponent implements OnInit {

  constructor(private router: Router, private activeRouter: ActivatedRoute ) { }

    goToQLDetail(url: string) {
      this.router.navigate(["/quanly",url])
    }

  goToQLich() {
    this.router.navigate(["/quanlylich"])
  }

    goToQLPC() {
      this.router.navigate(["/quanlypc"])
    }
  ngOnInit() {
  }

}
