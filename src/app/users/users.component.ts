import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public articlesService:ArticlesService) { }
public users:User[]=[]
  ngOnInit(): void {
    this.users = this.articlesService.getUsers();
  }

}
