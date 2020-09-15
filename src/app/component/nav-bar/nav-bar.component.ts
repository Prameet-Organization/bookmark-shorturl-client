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
  user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void{
    this.authService.getUser();
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
