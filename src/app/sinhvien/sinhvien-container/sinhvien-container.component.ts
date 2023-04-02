import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sinhvien-container',
  templateUrl: './sinhvien-container.component.html',
  styleUrls: ['./sinhvien-container.component.css']
})
export class SinhvienContainerComponent implements OnInit {

  constructor(private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

    goToSVChonNhom(url: string) {
        if(url){
          // this.activeRouter.queryParams.subscribe(query =>{
          //   console.log("queryParams:" +JSON.stringify(query));
          // }); //
          // this.activeRouter.params.subscribe(params =>{
          //   console.log("params:" + JSON.stringify(params));
          // }) // {"id":"1234"}
          console.log(url);
          this.router.navigate([`${url}`]) // mất hêt param phía sau, localhost:4200
        }
    }
}
