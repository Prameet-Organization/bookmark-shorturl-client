import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateShortUrlComponent } from './component/create-short-url/create-short-url.component';
import { UrlsComponent } from './component/urls/urls.component';
import { LoginComponent } from './component/login/login.component';
import { RedirectComponent } from './component/redirect/redirect.component';
const routes: Routes = [
  { path: 'createShortUrl', component: CreateShortUrlComponent },
  { path: 'urls', component: UrlsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
