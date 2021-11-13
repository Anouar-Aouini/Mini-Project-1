import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Article } from '../article/article.model';
import { ArticlesService } from '../articles.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {
  public searchedArticle: string = "";
  constructor(public articlesService:ArticlesService) { }
  public articles: Article[] = []
  public user?: User;
  public start: number = 0;
  public end: number = 6;
  public pageSlice?: Article[];;
  ngOnInit(): void {
    this.user = this.articlesService.getLoggedUser()
    this.articles = this.articlesService.getArticles()
    if (this.articles) {
      this.articles = this.articles.filter(el => el.makerId === this.user?.id);
      this.pageSlice = this.articles.slice(0, 6);
    }
  }

  deleteArticle(id: number) {
    if (this.articles) {
      this.articles = this.articlesService.getArticles().filter(el => el.makerId === this.user?.id).filter(el => el.id !== id)
    }
    this.articlesService.setArticles(JSON.stringify(this.articlesService.getArticles().filter(el => el.id !== id)));
    this.pageSlice = this.articles.slice(this.start,this.end);
  }

    editArticle(newArticle:{id:number,title:string,content:string}) {
    this.articlesService.setArticles(JSON.stringify(this.articlesService.
    getArticles().map(el => el.id === newArticle.id ?
    { ...el, title: newArticle.title, content: newArticle.content } : el)))
      this.articles = this.articlesService.getArticles().filter(el => el.makerId === this.user?.id);
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
