import { Injectable } from '@angular/core';
import { Article } from './article/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }
  public articles: Article[] = []

    getArticles() {
    let local: string = <string>localStorage.getItem("articles");
    this.articles = JSON.parse(local)
    return this.articles
    }

    setArticles(articles:string) {
    localStorage.setItem("articles",articles)
    }

    getUsers() {
    let local: string = <string>localStorage.getItem("users");
    return  JSON.parse(local);
    }

    setUsers(users:string) {
    localStorage.setItem("users", users)
    }

    setUser(user:string) {
    localStorage.setItem("user", user)
    }

    getLoggedUser() {
    let local:string = <string>localStorage.getItem('user')
    let user = JSON.parse(local)
    return user;
    }

    getUser() {
    let local:string = <string>localStorage.getItem('user')
    let user = JSON.parse(local)
    return !!user;
    }

}
