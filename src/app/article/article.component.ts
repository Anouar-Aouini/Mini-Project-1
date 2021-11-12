import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { User } from '../users/user.model';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: Article = { id: 1, title: "", content: "", makerId: 1 };
  @Input() i: number = 0;
  @Output() public deleteEvent = new EventEmitter();
  public user?: User;
  constructor(public articlesService:ArticlesService) { }

  ngOnInit(): void {
    this.user=this.articlesService.getLoggedUser()
  }

  deleteArticle(id:number) {
     this.deleteEvent.emit(id)
  }

}
