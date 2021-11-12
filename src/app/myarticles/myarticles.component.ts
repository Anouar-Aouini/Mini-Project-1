import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.user = this.articlesService.getLoggedUser()
    this.articles = this.articlesService.getArticles()
    if (this.articles) {
          this.articles=this.articles.filter(el => el.makerId === this.user?.id)
    }
  }

  deleteArticle(id: number) {
    if (this.articles) {
          this.articles = this.articlesService.getArticles().filter(el => el.makerId === this.user?.id).filter(el => el.id !== id)
    }
    this.articlesService.setArticles(JSON.stringify(this.articlesService.getArticles().filter(el => el.id !== id)))
  }
    editArticle(newArticle:{id:number,title:string,content:string}) {
      this.articlesService.setArticles(JSON.stringify(this.articlesService.
        getArticles().map(el => el.id === newArticle.id ?
        { ...el, title: newArticle.title, content: newArticle.content } : el)))
    this.articles = this.articlesService.getArticles().filter(el => el.makerId === this.user?.id);
  }

}
