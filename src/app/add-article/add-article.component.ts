import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from './../articles.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(public articlesService:ArticlesService) { }

  ngOnInit(): void {
  }

  addArticle(articleForm:NgForm){
    let local: string = this.articlesService.getLocal("articles");
    let user: string = this.articlesService.getLocal("user")
    let user1 = JSON.parse(user);
    let article={id: Math.random(),
         title: articleForm.value.title,
         content: articleForm.value.content ,
         makerId: user1.id }
    if (local) {
      let articles = [article, ...JSON.parse(local)];
      this.articlesService.setArticles(JSON.stringify(articles))
    } else {
      this.articlesService.setArticles(JSON.stringify([article]))
    }
    articleForm.resetForm()
  }
  }
