import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnAuthGuard } from './un-auth.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: "", redirectTo:"/home",pathMatch:"full" },
  { path:"home",component:LandingPageComponent,canActivate:[UnAuthGuard]},
  { path:"articles", component:ArticlesComponent, canActivate:[AuthGuard]},
  { path: "addarticle", component: AddArticleComponent, canActivate:[AuthGuard] },
  { path: "users", component: UsersComponent, canActivate:[AuthGuard] },
  { path: "myarticles", component: MyarticlesComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path:"**",component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents =[
  ArticlesComponent,
  ArticleComponent,
  LandingPageComponent,
  NavbarComponent,
  AddArticleComponent,
  PageNotFoundComponent,
  MyarticlesComponent,
  UsersComponent,
  DashboardComponent
]
