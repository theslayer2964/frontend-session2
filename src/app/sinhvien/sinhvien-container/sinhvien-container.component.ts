import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sinhvien-container',
  templateUrl: './sinhvien-container.component.html',
  styleUrls: ['./sinhvien-container.component.css']
})
export class SinhvienContainerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

    goToSVChonNhom(url: string) {
        if(url){
          this.router.navigate([`${url}`])
        }
    }
}
