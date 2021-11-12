import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { User } from '../users/user.model';
import { Article } from './../article/article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user?: User;
  public articles?: Article[];
  public myArticles?: Article[];
  public edit: boolean = false;
  @ViewChild("username") username?: ElementRef;
  constructor(public router: Router,public articlesService:ArticlesService) { }


  ngOnInit(): void {
    this.user = this.articlesService.getLoggedUser();
    if (this.articlesService.getArticles()) {
      this.articles = this.articlesService.getArticles()
    } else {
      this.articles = [];
    }

    if (this.articlesService.getArticles()) {
      this.myArticles=this.articlesService.getArticles().filter(el=>el.makerId===this.user?.id)
    } else {
      this.myArticles = [];
    }

  }
  logOut() {
    localStorage.removeItem("user");
    this.router.navigate(["/home"])
  }

  showTemp() {
    this.edit = true;
  }

  editUser(id: number) {
    this.articlesService.setUsers(JSON.stringify(this.articlesService.getUsers().map((el:User) => el.id === id ? {
      id: el.id, username: this.username?.nativeElement.value,password:el.password,email:el.email
    } : el)))
    this.articlesService.setUser(JSON.stringify(
      {...this.user,username:this.username?.nativeElement.value}
    ))
    this.user = this.articlesService.getLoggedUser();
    this.edit = false;
  }
}
