import { Component, OnInit } from '@angular/core';
import {UserService} from "../_service/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  message!: string
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  // forUser(){
  //   this.userService.forUser().subscribe(res => {
  //     this.message = res
  //   },err => {
  //     this.message = err
  //   })
  // }

}
