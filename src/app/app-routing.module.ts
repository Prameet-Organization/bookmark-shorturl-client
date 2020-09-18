import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CreateShortUrlComponent } from './component/create-short-url/create-short-url.component';
import { UrlsComponent } from './component/urls/urls.component';
import { LoginComponent } from './component/login/login.component';
import { RedirectComponent } from './component/redirect/redirect.component';
import { GroupComponent } from './component/group/group.component';
import { TeamComponent } from './component/team/team.component';
import { AuthGuardService } from './service/auth-guard.service';
const routes: Routes = [
  { path: 'createShortUrl', component: CreateShortUrlComponent },
  { path: 'urls', component: UrlsComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'group', component: GroupComponent,  canActivate: [AuthGuardService]},
  { path: 'team', component: TeamComponent, canActivate: [AuthGuardService]  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
