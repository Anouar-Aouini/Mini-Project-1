import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }
public users:User[]=[]
  ngOnInit(): void {
    let local: string = <string>localStorage.getItem("users");
    this.users = JSON.parse(local)
  }

}
