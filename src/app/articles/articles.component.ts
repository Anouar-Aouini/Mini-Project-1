import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.model';
import { ArticlesService } from '../articles.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public searchedArticle: string = "";

  constructor(public articlesService:ArticlesService) { }
  public articles: Article[] = []
  public user?: User;
  ngOnInit(): void {
    this.articles = this.articlesService.getArticles()
    this.user = this.articlesService.getLoggedUser();
  }
    deleteArticle(id: number) {
    if (this.articles) {
      this.articles = this.articlesService.getArticles().filter(el => el.id !== id)
      this.articlesService.setArticles(JSON.stringify(this.articles))
    }
  }

}
