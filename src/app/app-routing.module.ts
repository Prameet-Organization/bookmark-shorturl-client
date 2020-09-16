import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateShortUrlComponent } from './component/create-short-url/create-short-url.component';
import { UrlsComponent } from './component/urls/urls.component';
import { LoginComponent } from './component/login/login.component';
import { RedirectComponent } from './component/redirect/redirect.component';
import { GroupComponent } from './component/group/group.component';
import { TeamComponent } from './component/team/team.component';
const routes: Routes = [
  { path: 'createShortUrl', component: CreateShortUrlComponent },
  { path: 'urls', component: UrlsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'group', component: GroupComponent },
  { path: 'team', component: TeamComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
