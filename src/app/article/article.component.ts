import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @Output() public editEvent = new EventEmitter();
  @ViewChild("title") title?: ElementRef;
  @ViewChild("content") content?:ElementRef;
  public user?: User;
  public edit: boolean = false;
  constructor(public articlesService:ArticlesService) { }

  ngOnInit(): void {
    this.user=this.articlesService.getLoggedUser()
  }

  deleteArticle(id:number) {
     this.deleteEvent.emit(id)
  }
  showTemp() {
    this.edit = true;
  }

  editArticle(id: number) {
    this.editEvent.emit({ id: id, title: this.title?.nativeElement.value, content: this.content?.nativeElement.value })
    this.edit = false;
  }

}
