import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quanly-container',
  templateUrl: './quanly-container.component.html',
  styleUrls: ['./quanly-container.component.scss']
})
export class QuanlyContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

<<<<<<< HEAD
    goToQLDetail(url: string) {
      this.router.navigate(["/quanly",url])
    }

  goToQLich() {
    this.router.navigate(["/quanlylich"])
  }
=======
>>>>>>> c9dcca9f092e5e7a6ce0cbb23cbc0939bff3eb36
}
