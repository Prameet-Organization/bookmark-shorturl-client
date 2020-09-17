import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  title = 'app-title';
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void{
    this.authService.user$.subscribe(u => this.user = u);
    this.authService.getUser();
  }

  logout(): void{
    this.authService.logout();
    window.setTimeout(() => this.router.navigate(['login']), 0);
  }
}
