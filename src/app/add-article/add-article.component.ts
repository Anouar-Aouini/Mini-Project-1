import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addArticle(articleForm:NgForm) {

    let local: string = <string>localStorage.getItem("articles");

    let user:string = <string>localStorage.getItem("user")
    let user1 = JSON.parse(user);
     let article={id: Math.random(),
         title: articleForm.value.title,
         content: articleForm.value.content ,
         makerId: user1.id }
    if (local) {
      let articles = [article, ...JSON.parse(local)];
      localStorage.setItem('articles', JSON.stringify(articles));
    } else {
      localStorage.setItem("articles", JSON.stringify([article]))
    }
  }
  }
