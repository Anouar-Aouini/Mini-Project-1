import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ArticlesService } from './articles.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(public router: Router,public articlesService: ArticlesService){}
  canActivate(): boolean{
    if (!this.articlesService.getUser()) {
      return true;
    } else {
      this.router.navigate(['/dashboard'])
      return false;
    }
  }
}
