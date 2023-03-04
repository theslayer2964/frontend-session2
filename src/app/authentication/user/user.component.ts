import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../_service/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public message!: string
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser()
  }
  // @Input()
  // private

  forUser(){
    // this.userService.forUser().subscribe(res => {
    //   this.message = res
    // },err => {
    //   this.message = err
    // })
  }

}
