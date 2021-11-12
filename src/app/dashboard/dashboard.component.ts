import { Component, OnInit } from '@angular/core';
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
  constructor(public router: Router,public articlesService:ArticlesService) { }


  ngOnInit(): void {
    this.user = this.articlesService.getLoggedUser();
    this.articles = this.articlesService.getArticles()
    this.myArticles=this.articlesService.getArticles().filter(el=>el.makerId===this.user?.id)
  }
  logOut() {
    localStorage.removeItem("user");
    this.router.navigate(["/home"])
  }

}
