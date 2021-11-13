import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  public pageSlice?: Article[];
    public start: number = 0;
  public end: number = 6;
  ngOnInit(): void {
    this.articles = this.articlesService.getArticles()
    this.user = this.articlesService.getLoggedUser();
    this.pageSlice = this.articles.slice(0, 6);
  }
  deleteArticle(id: number) {
    if (this.articles) {
      this.articles = this.articlesService.getArticles().filter(el => el.id !== id)
      this.articlesService.setArticles(JSON.stringify(this.articles));
      this.pageSlice = this.articles.slice(this.start, this.end);
    }
    }
  editArticle(newArticle:{id:number,title:string,content:string}) {
    this.articlesService.setArticles(JSON.stringify(this.articles.map(el => el.id === newArticle.id ?
      { ...el, title: newArticle.title, content: newArticle.content } : el)))
    this.articles = this.articlesService.getArticles();
    this.pageSlice = this.articles.slice(this.start, this.end);
  }

  onChangePage(event:PageEvent) {
    const startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.articles.length) {
      endIndex = this.articles.length;
    }
    this.start = startIndex;
    this.end = endIndex;
    this.pageSlice = this.articles.slice(startIndex, endIndex);
  }

}
